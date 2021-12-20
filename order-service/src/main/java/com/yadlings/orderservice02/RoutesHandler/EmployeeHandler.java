package com.yadlings.orderservice02.RoutesHandler;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class EmployeeHandler {
    private OrderService orderService;

    public Mono<ServerResponse> getAllOrders(ServerRequest serverRequest) {
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(orderService.getOrders(), Order.class);
    }
    public Mono<ServerResponse> updateOrder(ServerRequest serverRequest) {
        return serverRequest
                .bodyToMono(Order.class)
                .map(orderService::update)
                .flatMap(response -> ServerResponse
                        .status(200)
                        .body(response, Order.class));
    }

    public Mono<ServerResponse> getOrdersInPrpcess(ServerRequest request) {
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(orderService.getOrdersInProcess(), Order.class);
    }
}
