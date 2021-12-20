package com.userservice.userservice.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(UserException.class)
    public ResponseEntity<UserExceptionResponse> userExceptionResponse(UserException exception, HttpServletRequest request){
        return new ResponseEntity<>(new UserExceptionResponse(
                exception.getStatus(),
                exception.getMessage(),
                exception.getAction(),
                request.getServletPath(),
                new Date().toString()),
                exception.getStatus()
        );

    }
}
