package com.yadlings.orderservice02.Common;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.UpdateResponse;
import org.springframework.http.HttpStatus;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

public interface OrderResponseTransformer {
    static UpdateResponse transformUpdate(Order order){
        return new UpdateResponse(
                        "Order with Id "+order.getOrderId()+" Was Updated",
                        "UPDATE",
                        HttpStatus.OK,
                        LocalDateTime.now().toString());
    }
}
