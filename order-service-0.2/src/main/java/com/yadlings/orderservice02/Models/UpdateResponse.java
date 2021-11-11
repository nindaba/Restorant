package com.yadlings.orderservice02.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UpdateResponse {
    private String message;
    private String type;
    private HttpStatus status;
    private String timestamp;
}
