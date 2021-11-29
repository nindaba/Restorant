package com.yadlings.orderservice02.RoutesHandler;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.Constants;
import com.yadlings.orderservice02.Service.KafkaService;
import com.yadlings.orderservice02.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class ClientHandler {
    private OrderService orderService;
    public Mono<ServerResponse> saveOrder(ServerRequest serverRequest) {
        var clientId = serverRequest.headers().firstHeader(Constants.AUTHORISED_USER_ID);
        return serverRequest
                .bodyToMono(Order.class)
                .map(order-> {order.setClientId(clientId);return order;})
                .map(orderService::save)
                .flatMap(orderId -> ServerResponse
                        .ok()
                        .body(orderId,String.class));
    }
    public Mono<ServerResponse> updateOrder(ServerRequest serverRequest) {
        return null;
    }

    //todo have to change the way we get the orders
    //AND WE GET ALL THE ORDERS BY ID BUT FILTER FOR KAFKA
    //as we can use a lot of power to do this
    public Mono<ServerResponse> getClientOrder(ServerRequest serverRequest) {
        var clientId = serverRequest.headers().firstHeader(Constants.AUTHORISED_USER_ID);
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(orderService.getAll()
                        .filter(order -> clientId.equals(order.getClientId())),
                        Order.class);
    }
}