package com.yadlings.orderservice02.Serdes;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.apache.kafka.common.serialization.Serializer;

public class KafkaSerializer<T> implements Serializer<T> {
    @SneakyThrows
    @Override
    public byte[] serialize(String s, T t) {
        return new ObjectMapper().writeValueAsBytes(t);
    }
}