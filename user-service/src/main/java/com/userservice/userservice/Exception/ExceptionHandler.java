package com.userservice.userservice.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(UserException.class)
    public ResponseEntity<UserException> userExceptionResponse(UserException exception, HttpServletRequest request){
        exception.setPath(request.getContextPath());
        return new ResponseEntity<UserException>(exception, HttpStatus.BAD_REQUEST);
    }
}
