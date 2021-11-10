package com.yadlings.orderservice02.RoutesHandler;

import com.yadlings.orderservice02.Documents.Order;
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
        return serverRequest
                .bodyToMono(Order.class)
                .map(orderService::save)
                .flatMap(orderId -> ServerResponse
                        .ok()
                        .body(orderId,String.class));
    }

    public Mono<ServerResponse> getOrder(ServerRequest serverRequest) {
        var clientId = serverRequest.pathVariable("clientId");
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(orderService.getAll(clientId),Order.class);
    }
    public Mono<ServerResponse> getOrderById(ServerRequest serverRequest) {
        return null;
    }

    public Mono<ServerResponse> updateOrder(ServerRequest serverRequest) {
        return null;
    }

    public Mono<ServerResponse> deleteAll(ServerRequest serverRequest) {
        return null;
    }

    public Mono<ServerResponse> deleteById(ServerRequest serverRequest) {
        return null;
    }

    public Mono<ServerResponse> getAllOrder(ServerRequest serverRequest) {
    }
}
