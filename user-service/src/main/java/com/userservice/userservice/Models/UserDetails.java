package com.userservice.userservice.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails {
    private String username;
    private String name;
    private String email;
    private UserType type;
    private Boolean accountLocked;
}
