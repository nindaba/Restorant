package com.userservice.userservice;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Models.UserType;

import java.util.UUID;

public class Common {
    public static User EMPLOYEE_USER = new User(
            UUID.randomUUID().toString(),
            "A",
            "A",
            "A@com",
            "strong",
            UserType.EMPLOYEE,
            true
    );
    public static User CLIENT_USER = new User(
            UUID.randomUUID().toString(),
            "B",
            "B",
            "B@com",
            "strong",
            UserType.CLIENT,
            true
    );

}
