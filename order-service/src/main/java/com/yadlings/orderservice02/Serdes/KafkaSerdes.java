package com.yadlings.orderservice02.Serdes;
import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;

public class KafkaSerdes {
    public static KafkaSerde<Order> Order(){
        return new KafkaSerde<>(new KafkaSerializer<>(), new KafkaDeserializer<>(Order.class));
    }
    public static KafkaSerde<OrderCount> OrderCount(){
        return new KafkaSerde<>(new KafkaSerializer<>(), new KafkaDeserializer<>(OrderCount.class));
    }
}
