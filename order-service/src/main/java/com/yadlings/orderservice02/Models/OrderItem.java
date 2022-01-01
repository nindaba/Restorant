package com.yadlings.orderservice02.Models;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private String itemId;
    private Integer number=0;
    private Double price=.0;
    private Double totalPrice=0d;
    public Double getTotalPrice() {
        return price*number;
    }

    @SneakyThrows
    public static List<OrderItem> deserialize(String orderItems){
        return new ObjectMapper().readValue(orderItems, new TypeReference<List<OrderItem>>() {});
    }

    public void update(Integer itemNumber, Double price) {
        // this is a simpler way but they is need of changing the callculation of total done on total so that the total price does not become affecrted
        this.price = price;
        number += itemNumber;
    }
}
