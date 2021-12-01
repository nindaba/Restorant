package com.yadlings.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}
	@Bean
	public RouteLocator routes(RouteLocatorBuilder routeLocatorBuilder){
		return routeLocatorBuilder.routes()
				.route("item-service", r -> r.path("/item/**").uri("lb://ITEM-SERVICE"))
                                .route("item-service", r -> r.path("/category/**").uri("lb://ITEM-SERVICE"))
				.route("user-service", r -> r.path("/user-service/**").uri("lb://USER-SERVICE"))
				.route("order-service", r -> r.path("/order/**").uri("lb://ORDER-SERVICE"))
				.build();
	}
	//todo after the project is finished try to shift the security here in the gate RIGHT?
}
