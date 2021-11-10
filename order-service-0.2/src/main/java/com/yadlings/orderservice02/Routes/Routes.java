package com.yadlings.orderservice02.Routes;

import com.yadlings.orderservice02.RoutesHandler.ClientHandler;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@Component
@AllArgsConstructor
public class Routes {
    private ClientHandler clientHandler;
    @Bean
    public RouterFunction<ServerResponse> clientsRoutes(){

        return RouterFunctions
                .route()
                .POST("/client-order",clientHandler::saveOrder)
                .GET("/client-order/{clientId}",clientHandler::getClientOrder)
                .GET(clientHandler::getOrderById)
                .PUT(clientHandler::updateOrder)
                .DELETE(clientHandler::deleteById)
                .DELETE(clientHandler::deleteAll)
                .build();
    }
    @Bean
    public RouterFunction<ServerResponse> employeeRoutes(){

        return RouterFunctions
                .route()
                .GET("/employee-order",clientHandler::getAllOrder)
                .GET(clientHandler::getOrderById)
                .PUT(clientHandler::updateOrder)
                .DELETE(clientHandler::deleteById)
                .DELETE(clientHandler::deleteAll)
                .build();
    }
}
