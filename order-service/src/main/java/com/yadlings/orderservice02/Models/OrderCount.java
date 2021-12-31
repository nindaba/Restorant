package com.yadlings.orderservice02.Models;


import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCount {
    private String status ;
    private Integer count = 0;
    private Double totalAmount = 0.0d;
    private Integer totalItems=0;

    public OrderCount(String status){
        this.status = status;
    }
    public void addCount(int count){
        this.count += count;
    }
    public void addAmount(Double amount){
        this.totalAmount += amount;
    }
    public void addItems(int number){
        totalItems += number;
    }

    @SneakyThrows
    public static OrderCount deserialize(String orderCount){
        return new ObjectMapper().readValue(orderCount,OrderCount.class);
    }
}
