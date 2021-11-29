package com.userservice.userservice.Controllers;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Models.UserType;
import com.userservice.userservice.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(value="/user-service")
public class UserController {
    private UserService userService;
    @PostMapping(value = "/register-client")
    public ResponseEntity<String> registerClient(@RequestBody User user){
	user.setType(UserType.CLIENT);
	userService.save(user);
	return new ResponseEntity<String>(" {\"hello\":\"itIsMe\"}",HttpStatus.OK);
//        return userService.save(user);
    }
    
    @PostMapping(value = "/register-employee")
    public ResponseEntity<HttpStatus> registerEmployee(@RequestBody User user){
        user.setType(UserType.EMPLOYEE);
        return userService.save(user);
    }
    @PutMapping
    public ResponseEntity<HttpStatus> updateAccount(@RequestBody User user){
        return userService.update(user);
 	}
}
