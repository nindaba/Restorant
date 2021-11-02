package com.yadlings.orderservice.documents;
import com.yadlings.orderservice.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document
public class Order {
    private String orderId;
    private String clientId;
    private List<OrderItem> orderItems;

    public Double getTotalPrice(){
        return orderItems
                .stream()
                .map(item -> item.getPrice() * item.getNumber())
                .reduce(.0, Double::sum);
    }
}
