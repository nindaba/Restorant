package com.userservice.userservice.Models;

import com.userservice.userservice.Documents.User;
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

    public UserDetails(User user){
        username= user.getUsername();
        name = user.getName();
        email = user.getEmail();;
        type = user.getType();
        accountLocked = user.getAccountLocked();
    }
}
