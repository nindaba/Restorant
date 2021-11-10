package com.yadlings.orderservice.documents;

import com.yadlings.orderservice.model.OrderedItem;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class OrderTest {
    private static final String CLIENT_ID = "yehjbwuy82372hu2yfhf892";
    private Double TOTAL_PRICE;
    private Order order;
    @BeforeAll
    void setUp(){
        order = new Order(CLIENT_ID);
        order.getOrderItems().add(new OrderedItem("1",1,2.0)); // total price = 2.0
        order.getOrderItems().add(new OrderedItem("2",2,4.0)); // total price = 8.0
        order.getOrderItems().add(new OrderedItem("3",3,3.0)); // total price = 9.0
        TOTAL_PRICE = order // 19.0
                .getOrderItems()
                .stream()
                .map(orderedItem -> orderedItem.getNumber()*orderedItem.getPrice())
                .reduce(.0,Double::sum);
    }
    @Test
    void getTotalPrice() {
        //The Total from the method should be equal to 19
        assertEquals(order.getTotalPrice(),TOTAL_PRICE);
    }
}