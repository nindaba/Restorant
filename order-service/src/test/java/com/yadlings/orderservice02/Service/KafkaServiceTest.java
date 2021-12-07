package com.yadlings.orderservice02.Service;

import com.yadlings.orderservice02.Documents.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
class KafkaServiceTest {
    private static final Order ORDER = new Order("client");
    @Autowired
    KafkaService kafkaService;
    @Test
    void sendToEmployee() {
    }

    @Test
    void sendToClient() {
    }

    @Test
    void testSendToClient() {
    }

//    @Test
    void sendToAll() {
        Mono<Order> expected = Mono.just(ORDER);
        Mono<Order> actual = kafkaService.sendToAll(ORDER);
        assertEquals(expected,actual);
    }
}