package com.userservice.userservice.Exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class UserException extends RuntimeException{
    private HttpStatus status;
    private String action;
    private String message;
    public UserException(HttpStatus status, String action, String message){
        super(message);
        this.status = status;
        this. action = action;
        this. message = message;
    }
}
