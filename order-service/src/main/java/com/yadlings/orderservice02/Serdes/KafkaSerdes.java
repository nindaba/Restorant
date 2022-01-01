package com.yadlings.orderservice02.Serdes;
import com.fasterxml.jackson.core.type.TypeReference;
import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Models.OrderItem;

import java.util.List;

public class KafkaSerdes {
    public static CustomSerde.KafkaSerde<Order> Order(){
        return new CustomSerde.KafkaSerde<>(new KafkaSerializer<>(), new KafkaDeserializer<>(Order.class));
    }
    public static CustomSerde.KafkaSerde<OrderCount> OrderCount(){
        return new CustomSerde.KafkaSerde<>(new KafkaSerializer<>(), new KafkaDeserializer<>(OrderCount.class));
    }
    public static CustomSerde.KafkaListSerde<List<OrderItem>> OrderItem(){
        return new CustomSerde.KafkaListSerde<>(new KafkaSerializer<>(), new KafkaListDeserialize<>(new TypeReference<List<OrderItem>>(){}));
    }
}
