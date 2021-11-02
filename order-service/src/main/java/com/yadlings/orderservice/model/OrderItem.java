package com.yadlings.orderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItem{
    private String itemId;
    private Integer number;
    private Double price;
}
