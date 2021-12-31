package com.yadlings.orderservice02.Service;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Streams.OrderStreams;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    private KafkaSender<String, String> kafkaSender;
    private ConnectableFlux<ReceiverRecord<String, String>> connectableFlux;
    private ConnectableFlux<ReceiverRecord<String, String>> orderCounterFlux;

    @NonNull private OrderStreams orderStreams;
    @PostConstruct
    public void init(){
        /**
         * Sender Initialization
         */
        Map<String, Object> config = Map.of(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS,
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer",
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer"
        );
        SenderOptions<String, String> senderOptions = SenderOptions.<String, String>create(config)
                .maxInFlight(1024);
        kafkaSender = KafkaSender.create(senderOptions);

        /**
         * Receiver Initialization
         */
        config = Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer",
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer",
                ConsumerConfig.GROUP_ID_CONFIG,"Reactive-group-1"
//                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,"earliest"
        );
        ReceiverOptions<String, String> receiverOptions = ReceiverOptions
                .<String, String>create(config)
                .subscription(Collections.singleton(CLIENT_TOPIC));
        connectableFlux = KafkaReceiver
                .create(receiverOptions)
                .receive()
                .publish();
        connectableFlux.connect();


        config = Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS,
                ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer",
                ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer",
                ConsumerConfig.GROUP_ID_CONFIG,"Reactive-group-1"
//                ConsumerConfig.AUTO_OFFSET_RESET_CONFIG,"earliest"
        );
        orderCounterFlux = KafkaReceiver
                .create(ReceiverOptions
                        .<String, String>create(config)
                        .subscription(Collections.singleton(COUNTED_TOPIC)))
                .receive()
                .publish();
        orderCounterFlux.connect();


    }
    @Bean
    public KafkaAdmin admin(){
        return new KafkaAdmin(Map.of(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKERS));
    }
    @Bean
    public NewTopic clientTopic(){
        return TopicBuilder
                .name(CLIENT_TOPIC)
                .partitions(1)
                .replicas(1)//TODO change to 3
                .build();
    }
    @Bean
    public NewTopic employeeTopic(){
        return TopicBuilder
                .name(EMPLOYEE_TOPIC)
                .partitions(1)
                .replicas(1)//TODO change to 3
                .build();
    }
    /**
     * This is a custom kafka receiver
     * @return ConnectableFlux<ReceiverRecord<Integer, String>>
     */
    public Flux<Order> receive(){
        return connectableFlux.map(ReceiverRecord::value)
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
    public Mono<Order> sendToEmployee(Order order){
        return kafkaSender
                .createOutbound()
                .send(Flux
                .just(order)
                .map(record -> new ProducerRecord<>(EMPLOYEE_TOPIC, record.getOrderId(), record.serialize()))
                )
                .then()
                .map(voidValue -> order);
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
}
