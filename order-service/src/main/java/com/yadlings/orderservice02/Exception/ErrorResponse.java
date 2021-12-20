package com.yadlings.orderservice02.Exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private String message;
    private HttpStatus status;
    private String path;
    private long timeStamp;

    public static byte[] getBytes(ErrorResponse response){
        try{
            return new ObjectMapper()
                    .writeValueAsBytes(response);
        }
        catch (JsonProcessingException exception){
            exception.printStackTrace();
            return new byte[]{};
        }

    }
}
