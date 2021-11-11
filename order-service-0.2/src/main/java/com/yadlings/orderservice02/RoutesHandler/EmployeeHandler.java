package com.yadlings.orderservice02.RoutesHandler;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.UpdateResponse;
import com.yadlings.orderservice02.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class EmployeeHandler {
    private OrderService orderService;

    public Mono<ServerResponse> getAllOrder(ServerRequest serverRequest) {
        return ServerResponse
                .ok()
                .body(orderService.getAll(), Order.class);
    }

    public Mono<ServerResponse> updateOrder(ServerRequest serverRequest) {
        return serverRequest
                .bodyToMono(Order.class)
                .flatMap(orderService::update)
                .flatMap(response -> ServerResponse
                        .status(response.getStatus())
                        .body(Flux.just(response), UpdateResponse.class));
    }
}
