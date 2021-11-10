package com.yadlings.orderservice.documents;
import com.yadlings.orderservice.model.OrderStatus;
import com.yadlings.orderservice.model.OrderedItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
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
}
