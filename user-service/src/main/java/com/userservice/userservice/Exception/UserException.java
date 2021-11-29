package com.userservice.userservice.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
public class UserException extends RuntimeException{
    private String action;
    private String message;
    private HttpStatus status;
    private String path;
    private String timeStamp = new Date().toString();
    public UserException(HttpStatus status,String action, String message){
        super(message);
        this. action = action;
        this. message = message;
    }
}
