package com.yadlings.orderservice02.Serdes;

import lombok.AllArgsConstructor;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serializer;
@AllArgsConstructor
public class KafkaSerde<T> implements Serde<T> {
    private KafkaSerializer<T> serializer;
    private KafkaDeserializer<T> deserializer;
    @Override
    public Serializer<T> serializer() {
        return serializer;
    }

    @Override
    public Deserializer<T> deserializer() {
        return deserializer;
    }
}
