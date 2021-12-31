package com.yadlings.orderservice02.Routes;

import com.yadlings.orderservice02.Models.Constants;
import com.yadlings.orderservice02.RoutesHandler.ClientHandler;
import com.yadlings.orderservice02.RoutesHandler.EmployeeHandler;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;
@Component
@AllArgsConstructor
public class Routes {
    private ClientHandler clientHandler;
    private EmployeeHandler employeeHandler;

    @Bean
    public RouterFunction<ServerResponse> RouterFunctions(){
        return RouterFunctions
                .route()
                .POST("/order",clientHandler::saveOrder)
                .GET("/order",clientHandler::getClientOrders)
                .GET("/order/in-process",employeeHandler::getOrdersInProcess)
                .GET("/order/all",employeeHandler::getAllOrders)
                .PUT("/order",employeeHandler::updateOrder)


                .GET("/order/counter",employeeHandler::getOrderCount)

                .build();
    }
}
