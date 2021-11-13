package com.yadlings.orderservice02.Service;

import com.yadlings.orderservice02.Documents.Order;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Value;
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
public class KafkaService {

    @Value("${kafka.bootstrap}")
    private String BROKER;
    @Value("${kafka.topic.employee}")
    private String EMPLOYEE_TOPIC;
    @Value("${kafka.topic.client}")
    private String CLIENT_TOPIC;
    private KafkaSender<String, String> kafkaSender;
    private ConnectableFlux<ReceiverRecord<String, String>> connectableFlux;
    @PostConstruct
    public void init(){
        //Sender Initialization
        Map<String, Object> config = Map.of(
                ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKER,
                ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer",
                ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer"
        );
        SenderOptions<String, String> senderOptions = SenderOptions.<String, String>create(config)
                .maxInFlight(1024);
        kafkaSender = KafkaSender.create(senderOptions);

        //Receiver Initialization
        config = Map.of(
                ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, BROKER,
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
    }

    /**
     * This is a custom kafka receiver
     * @return ConnectableFlux<ReceiverRecord<Integer, String>>
     */
    public ConnectableFlux<ReceiverRecord<String, String>> receive(){
        return connectableFlux;
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
    public Mono<Order> sendToClient(Order order){
        return kafkaSender
                .createOutbound()
                .send(Flux
                        .just(order)
                        .map(record -> new ProducerRecord<>(CLIENT_TOPIC, record.getOrderId(), record.serialize()))
                )
                .then()
                .map(voidValue -> order);
    }
    public Mono<Order> sendToClient(Mono<Order> order){
        return kafkaSender
                .createOutbound()
                .send(order.map(record -> new ProducerRecord<>(CLIENT_TOPIC, record.getOrderId(), record.serialize())))
                .then()
                .flatMap(voidValue -> order);
    }
    public Mono<Order> sendToTopics(Order order) {
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
}
