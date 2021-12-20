package com.yadlings.orderservice02.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderedItem {
    private String itemId;
    private Integer number=0;
    private Double price=.0;
}
