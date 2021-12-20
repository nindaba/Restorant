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
                .map(order-> {
                    order.setClientId(clientId); /**set the client id to the one stored in the header*/
                    order.setOrderId(null); /** set the orderId to null otherwise mongo will not give it an id */
                    return order;
                })
                .flatMap(orderService::save)
                .flatMap(orderId -> ServerResponse
                        .ok()
                        .header("Location",orderId)
                        .body(Mono.empty(),Void.class));
    }
    public Mono<ServerResponse> updateOrder(ServerRequest serverRequest) {
        return null;
    }


    public Mono<ServerResponse> getClientOrders(ServerRequest serverRequest) {
        var clientId = serverRequest.headers().firstHeader(Constants.AUTHORISED_USER_ID);
        return ServerResponse
                .ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(orderService.getOrders(clientId),Order.class);
    }
}
