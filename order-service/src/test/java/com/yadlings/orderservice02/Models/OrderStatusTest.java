package com.yadlings.orderservice02.Models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class OrderStatusTest {
    @Test
    void setCooking() {
        OrderStatus ORDER_STATUS = new OrderStatus();
        ORDER_STATUS.setCooking(true);
        Assertions.assertTrue(
                ORDER_STATUS.getAccepted()
                        &&ORDER_STATUS.getCooking());
    }

    @Test
    void setReady() {
        OrderStatus ORDER_STATUS = new OrderStatus();
        ORDER_STATUS.setReady(true);
        Assertions.assertTrue(
                ORDER_STATUS.getAccepted()
                        &&ORDER_STATUS.getCooking()
                        &&ORDER_STATUS.getReady());
    }

    @Test
    void setServed() {
        OrderStatus ORDER_STATUS = new OrderStatus();
        ORDER_STATUS.setServed(true);
        Assertions.assertTrue(
                ORDER_STATUS.getAccepted()
                        &&ORDER_STATUS.getCooking()
                        &&ORDER_STATUS.getServed()
                        &&ORDER_STATUS.getReady());
    }

    @Test
    void setPayed() {
        OrderStatus ORDER_STATUS = new OrderStatus();
        ORDER_STATUS.setPayed(true);
        Assertions.assertTrue(
                ORDER_STATUS.getAccepted()
                        &&ORDER_STATUS.getCooking()
                        &&ORDER_STATUS.getServed()
                        &&ORDER_STATUS.getPayed()
                        &&ORDER_STATUS.getReady());
    }
}