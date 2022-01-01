package com.yadlings.orderservice02.Serdes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.apache.kafka.common.serialization.Deserializer;

@AllArgsConstructor
public class KafkaListDeserialize<T> implements Deserializer<T> {

    private TypeReference<? extends T> typeReference;

    @SneakyThrows
    @Override
    public T deserialize(String s, byte[] bytes) {
        return new ObjectMapper().readValue(bytes,typeReference);
    }
}
