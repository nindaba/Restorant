package com.userservice.userservice.Services;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Exception.UserException;
import com.userservice.userservice.Exception.UserExceptionResponse;
import com.userservice.userservice.Models.UserType;
import com.userservice.userservice.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.net.URI;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Log4j2
public class UserService implements org.springframework.security.core.userdetails.UserDetailsService {
    private UserRepository repository;
    public User getUserByUsername(String username){
        return repository
                .findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException(
                        String.format("User with username {} was not found try registering",username)));

    }
    public User getUserEmail(String email){
        return repository
                .findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException(
                        String.format("User with email {} was not found try registering",email)));

    }
    public User getUserByUsernameOrEmail(String emailOrUsername){
        return repository
                .findByUsername(emailOrUsername)
                .orElseGet(()-> repository.findByEmail(emailOrUsername)
                        .orElseThrow(()-> new UserException(
                                HttpStatus.NOT_FOUND,
                                "finding user Username email",
                                String.format("%s was not found try sign up ",emailOrUsername)
                        )));

    }
    public ResponseEntity<HttpHeaders> save(User user){
	user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        if(repository.findByEmail(user.getEmail())
                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The email already taken");
        if(repository.findByUsername(user.getUsername())
                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The username already taken");
	    ;
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(URI.create(
                repository
                        .save(user)
                        .getUserId()
        ));
        return new ResponseEntity<>(httpHeaders,HttpStatus.OK);
    }
    public ResponseEntity<HttpStatus> update(User user){
	//the will be a methord for a password update
	//Note that we can not change the account type
        return repository
                .findById(user.getUserId())
                .map(foundUser ->{
                    if(!foundUser.getEmail().equals(user.getEmail())){
                        if(repository.findByEmail(user.getEmail())
                                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The email already taken");
                    }
                    if(!foundUser.getUsername().equals(user.getUsername())){
                        if(repository.findByUsername(user.getUsername())
                                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The username already taken");
                    }
                    user.setType(foundUser.getType());
                    user.setPassword(foundUser.getPassword());
                    repository.save(user);
                    return new ResponseEntity<HttpStatus>(HttpStatus.OK);
                })
                .orElseThrow(()-> new UserException(HttpStatus.NOT_FOUND,"Updating Account","User Not found"));
    }
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return getUserByUsernameOrEmail(s);
    }

    public ResponseEntity<User> getDetails(String id) {
        return repository.findById(id)
                .map(user -> {
                    user.setPassword("");
                    return new ResponseEntity<>(user,HttpStatus.OK);
                })
                .orElseThrow(()-> new UserException(
                        HttpStatus.NOT_FOUND,
                        "finding user Details by id",
                        String.format("user was not found ")
                ));
    }

    public ResponseEntity<List<User>> getEmployees() {
        return new ResponseEntity<>(repository
                .findByType(UserType.EMPLOYEE)
                .stream()
                .map(user -> {
                    user.setPassword("");
                    return user;
                })
                .collect(Collectors.toList()),HttpStatus.OK);
    }

    public ResponseEntity<?> delete(String id) {
        repository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
