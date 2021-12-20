package com.yadlings.orderservice02.Exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.auth0.jwt.exceptions.TokenExpiredException;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Date;

@Configuration
public class Handler implements ErrorWebExceptionHandler {
    @ExceptionHandler(TokenExpiredException.class)
    public ErrorResponse authentication(TokenExpiredException exception, ServerRequest request){
        return new ErrorResponse(
                exception.getMessage(),
                HttpStatus.UNAUTHORIZED,
                request.path(),
                new Date().getTime()
        );
    }

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable exception) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBufferFactory factory = exchange.getResponse().bufferFactory();
        DataBuffer dataBuffer = factory.wrap(
                ErrorResponse.getBytes(
                        new ErrorResponse(
                                exception.getMessage(),
                                HttpStatus.UNAUTHORIZED,
                                exchange.getRequest().getPath().toString(),
                                new Date().getTime()
                        )
                )
        );
        return exchange.getResponse().writeWith(Mono.just(dataBuffer));
    }
}
