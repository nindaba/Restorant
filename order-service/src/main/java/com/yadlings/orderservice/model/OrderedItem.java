package com.yadlings.orderservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderedItem {
    private String itemId;
    private Integer number;
    private Double price;
}
