package com.yadlings.orderservice02.Models;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderStatus {
    private Boolean accepted = false;
    private Boolean cooking  = false;
    private Boolean ready    = false;
    private Boolean served   = false;
    private Boolean payed    = false;
    private String  cancelMessage;
}
