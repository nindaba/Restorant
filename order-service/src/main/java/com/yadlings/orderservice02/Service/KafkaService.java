package com.yadlings.orderservice02.Service;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Models.OrderItem;
import com.yadlings.orderservice02.Streams.OrderStreams;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaAdmin;
import org.springframework.stereotype.Service;
import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;
import reactor.kafka.sender.KafkaSender;
import reactor.kafka.sender.SenderOptions;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class KafkaService {
    @Value("${kafka.bootstrap}")
    private String BROKERS;
    @Value("${kafka.topic.employee}")
    private String EMPLOYEE_TOPIC;
    @Value("${kafka.topic.client}")
    private String CLIENT_TOPIC;
    @Value("${kafka.topic.order-counter}")
    private String COUNTED_TOPIC;
    @Value("${kafka.topic.most-sold}")
    private String MOST_SOLD_TOPIC;
    private KafkaSender<String, String> kafkaSender;
    private ConnectableFlux<ReceiverRecord<String, String>> orderFlux;
    private ConnectableFlux<ReceiverRecord<String, String>> orderCounterFlux;
    private ConnectableFlux<ReceiverRecord<String, String>> OrderItemFlux;

    @NonNull private OrderStreams orderStreams;
    @PostConstruct
    public void init(){
        /**
         * Sender Initialization
         */
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");

        kafkaSender = KafkaSender.create(
                SenderOptions.<String, String>create(config).maxInFlight(1024)
        );

        /**
         * Receiver Initialization
         */
//Read Client Orders
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Reactive-order-consumer");
        orderFlux = KafkaReceiver
                .create(ReceiverOptions
                        .<String, String>create(config)
                        .subscription(Collections.singleton(CLIENT_TOPIC)))
                .receive()
                .publish();
        orderFlux.connect();
//
//Read OrderCount
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Reactive-counted-consumer");
        orderCounterFlux = KafkaReceiver
                .create(ReceiverOptions
                        .<String, String>create(config)
                        .subscription(Collections.singleton(COUNTED_TOPIC)))
                .receive()
                .publish();
        orderCounterFlux.connect();
//
////Read OrderCount
        config.put(ConsumerConfig.GROUP_ID_CONFIG,"Reactive-order-consumer");
        OrderItemFlux = KafkaReceiver
                .create(ReceiverOptions
                        .<String, String>create(config)
                        .subscription(Collections.singleton(MOST_SOLD_TOPIC)))
                .receive()
                .publish();
        OrderItemFlux.connect();
    }
    @Bean
    public KafkaAdmin admin(){
        return new KafkaAdmin(Map.of(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS));
    }
    @Bean
    public NewTopic clientTopic(){
        return TopicBuilder
                .name(CLIENT_TOPIC)
                .partitions(1)
                .replicas(3)//TODO change to 3 when deploying
                .build();
    }
    @Bean
    public NewTopic employeeTopic(){
        return TopicBuilder
                .name(EMPLOYEE_TOPIC)
                .partitions(1)
                .replicas(3)//TODO change to 3 when deploying
                .build();
    }
    /**
     * This is a custom kafka receiver
     * @return ConnectableFlux<ReceiverRecord<Integer, String>>
     */
    public Flux<Order> receive(){
        return orderFlux.map(ReceiverRecord::value)
                .map(Order::deserialize);
    }

    /**
     * This is a configured kafka sender
     * @return KafkaSender
     */
    public KafkaSender sender(){
        return kafkaSender;
    }

    /**
     * This method will send the record to employee topic
     * @param order
     * @return Mono<Order>
     */
    public Mono<String> sendToEmployee(Order order){
        return kafkaSender
                .createOutbound()
                .send(Flux
                .just(order)
                .map(record -> new ProducerRecord<>(EMPLOYEE_TOPIC, record.getOrderId(), record.serialize()))
                )
                .then()
                .cast(String.class)
                .concatWith(Mono.just(order.getOrderId()))
                .single();
    }
    /**
     * This method will send the record to client topic
     * @param order
     * @return Mono of Order
     */
    public Mono<String> sendToClient(Order order){
        return kafkaSender
                .createOutbound()
                .send(Flux
                        .just(order)
                        .map(record -> new ProducerRecord<>(CLIENT_TOPIC, record.getOrderId(), record.serialize()))
                ).then()
                .cast(String.class)
                .concatWith(Mono.just(order.getOrderId()))
                .single();
    }
    public Mono<Order> sendToClient(Mono<Order> order){
        return kafkaSender
                .createOutbound()
                .send(order.map(record -> new ProducerRecord<>(CLIENT_TOPIC, record.getOrderId(), record.serialize())))
                .then()
                .flatMap(voidValue -> order);
    }
    public Mono<Order> sendToAll(Order order) {
        return kafkaSender
                .createOutbound()
                .send(Flux
                .just(order)
                .map(record -> new ProducerRecord<>(CLIENT_TOPIC, record.getOrderId(), record.serialize())))
                .send(Flux
                .just(order)
                .map(record -> new ProducerRecord<>(EMPLOYEE_TOPIC, record.getOrderId(), record.serialize())))
                .then()
                .map(voidValue -> order);
    }

    public Flux<OrderCount> getOrderCount(){
        return Flux.merge(
                Flux.create(emitter -> {
                    orderStreams.getOrderCountStore().all()
                            .forEachRemaining(keyValue -> emitter.next(keyValue.value));
                    emitter.complete();
                }),
                orderCounterFlux
                        .map(ReceiverRecord::value)
                        .map(OrderCount::deserialize)
        );
    }
    public Flux<List<OrderItem>> getMostSold(){
        return Flux.merge(
                Flux.create(emitter -> {
                    orderStreams.getOrderItemsStore().all()
                            .forEachRemaining(keyValue -> emitter.next(keyValue.value));
                    emitter.complete();
                }),
                OrderItemFlux
                        .map(ReceiverRecord::value)
                        .map(OrderItem::deserialize)
        );
    }
}
