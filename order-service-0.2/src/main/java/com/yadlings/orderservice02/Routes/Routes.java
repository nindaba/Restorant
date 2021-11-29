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
    public RouterFunction<ServerResponse> clientsRoutes(){

        return RouterFunctions
                .route()
                .POST("/client-order",clientHandler::saveOrder)
                .GET("/client-order",clientHandler::getClientOrder)
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> employeeRoutes(){
        return RouterFunctions
                .route()
                .GET("/employee-order",employeeHandler::getAllOrder)
                .PUT("/employee-order",employeeHandler::updateOrder)
                .GET("/a",serverRequest->{
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    System.out.println("###################");
                    return ServerResponse
                            .ok()
                            .body(
                                    //Mono.just(serverRequest.headers().firstHeader(Constants.AUTHORISED_USER_ID)),
                                    Mono.just("HELLO"),
                                    String.class);
                })
                .build();
//        serverRequest
//                .headers()
//                .header(Constants.AUTHORISED_USER_ID),
    }
}
