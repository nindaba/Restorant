package com.userservice.userservice.Services;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Exception.UserException;
import com.userservice.userservice.Exception.UserExceptionResponse;
import com.userservice.userservice.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
    public ResponseEntity<HttpStatus> save(User user){
	user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        if(repository.findByEmail(user.getEmail())
                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The email already taken");
        if(repository.findByUsername(user.getUsername())
                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The username already taken");
	repository.save(user);
        return new ResponseEntity<HttpStatus>(HttpStatus.OK);
    }
    public ResponseEntity<HttpStatus> update(User user){
	//the will be a methord for a password update
	//Note that we can not change the account type
        return repository
                .findById(user.getUserId())
                .map(foundUser ->{
                    if(foundUser.getEmail() != user.getEmail()){
                        if(repository.findByEmail(user.getEmail())
                                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The email already taken");
                    }
                    if(foundUser.getUsername() != user.getUsername()){
                        if(repository.findByUsername(user.getUsername())
                                .isPresent()) throw new UserException(HttpStatus.CONFLICT,"Updating User","The username already taken");
                    }
                    user.setType(foundUser.getType());		
                    repository.save(user);
                    return new ResponseEntity<HttpStatus>(HttpStatus.OK);
                })
                .get();
    }
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return getUserByUsernameOrEmail(s);
    }

    public ResponseEntity<com.userservice.userservice.Models.UserDetails> getDetails(String id) {
        return repository.findById(id)
                .map(user-> new com.userservice.userservice.Models.UserDetails(
                        user.getUsername(),
                        user.getName(),
                        user.getEmail(),
                        user.getType()
                ))
                .map(user-> new ResponseEntity<>(user,HttpStatus.OK))
                .orElseThrow(()-> new UserException(
                        HttpStatus.NOT_FOUND,
                        "finding user Details by id",
                        String.format("use with id %s was not found ",id)
                ));
    }
}
