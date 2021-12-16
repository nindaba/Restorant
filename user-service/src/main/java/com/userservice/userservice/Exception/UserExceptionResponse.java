package com.userservice.userservice.Exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.util.Date;

@Data
@AllArgsConstructor
public class UserExceptionResponse {
    private HttpStatus status;
    private String message;
    private String action;
    private String path;
    private String timeStamp;
}
