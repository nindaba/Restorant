package com.userservice.userservice.Controllers;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Models.UserDetails;
import com.userservice.userservice.Models.UserType;
import com.userservice.userservice.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.userservice.userservice.Models.Common.SERVICE_END_POINT;

@RestController
@AllArgsConstructor
@RequestMapping(SERVICE_END_POINT)
public class UserController {
    private UserService userService;
    @PostMapping(value = "/client")
    public ResponseEntity<HttpStatus> registerClient(@RequestBody User user){
	    user.setType(UserType.CLIENT);
        return userService.save(user);
    }
    
    @PostMapping(value = "/employee")
    public ResponseEntity<HttpStatus> registerEmployee(@RequestBody User user){
        user.setType(UserType.EMPLOYEE);
        return userService.save(user);
    }
    @PutMapping
    public ResponseEntity<HttpStatus> updateAccount(@RequestBody User user) {
        return userService.update(user);
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserDetails> getDetails(@PathVariable String id){
        return userService.getDetails(id);
    }
    @GetMapping("/employees") ResponseEntity<List<UserDetails>> getEmployees(){
        return userService.getEmployees();
     }
}
