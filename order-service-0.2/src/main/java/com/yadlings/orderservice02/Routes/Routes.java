package com.yadlings.orderservice02.Routes;

import com.yadlings.orderservice02.RoutesHandler.ClientHandler;
import com.yadlings.orderservice02.RoutesHandler.EmployeeHandler;
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
    private EmployeeHandler employeeHandler;
    @Bean
    public RouterFunction<ServerResponse> clientsRoutes(){

        return RouterFunctions
                .route()
                .POST("/client-order",clientHandler::saveOrder)
                .GET("/client-order/{clientId}",clientHandler::getClientOrder)
                .build();
    }
    @Bean
    public RouterFunction<ServerResponse> employeeRoutes(){
        return RouterFunctions
                .route()
                .GET("/employee-order",employeeHandler::getAllOrder)
                .PUT(employeeHandler::updateOrder)
                .build();
    }
}
