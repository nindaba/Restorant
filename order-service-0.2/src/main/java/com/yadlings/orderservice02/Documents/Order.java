package com.yadlings.orderservice02.Documents;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yadlings.orderservice02.Models.OrderStatus;
import com.yadlings.orderservice02.Models.OrderedItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Order {
    @Id
    private String orderId;
    private String clientId;
    private List<OrderedItem> orderItems = new ArrayList<>();
    private OrderStatus status = OrderStatus.ORDERED;
    private Long timeCreated = new Date().getTime();
    private Long timeUpdated = new Date().getTime();
    public Order(String clientId){this.clientId = clientId;}

    /**
     * @return The Total price of All Ordered Items
     */
    public Double getTotalPrice(){
        return orderItems
                .stream()
                .map(item -> item.getPrice() * item.getNumber())
                .reduce(.0, Double::sum);
    }
    public void setTotalPrice(Double totalPrice){}
    public String serialize(){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }
    public static Order deserialize(String order){
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Order readValue = objectMapper.readValue(order, Order.class);
            return readValue;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
