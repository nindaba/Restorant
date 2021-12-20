package com.userservice.userservice.Services;

import com.userservice.userservice.Common;
import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Exception.UserException;
import com.userservice.userservice.Models.UserType;
import com.userservice.userservice.Repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static com.userservice.userservice.Common.CLIENT_USER;
import static com.userservice.userservice.Common.EMPLOYEE_USER;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserServiceTest {
    UserService service;
    UserRepository repository;
    @BeforeAll
    void setUp() {
        repository = mock(UserRepository.class);
        service = new UserService(repository);
    }

    @Test
    void getUserByUsername() {
        when(repository.findByUsername(CLIENT_USER.getUsername())).thenReturn(Optional.of(CLIENT_USER));
        User actual = service.getUserByUsername(CLIENT_USER.getUsername());
        assertEquals(CLIENT_USER,actual);
    }

    @Test
    void getUserEmail() {
        when(repository.findByEmail(CLIENT_USER.getEmail())).thenReturn(Optional.of(CLIENT_USER));
        User actual = service.getUserEmail(CLIENT_USER.getEmail());
        assertEquals(CLIENT_USER,actual);
    }

    @Test
    void getUserByUsernameOrEmail() {
        when(repository.findByUsername(CLIENT_USER.getUsername())).thenReturn(Optional.of(CLIENT_USER));
        when(repository.findByEmail(CLIENT_USER.getEmail())).thenReturn(Optional.of(CLIENT_USER));
        User actual = service.getUserByUsernameOrEmail(CLIENT_USER.getUsername());
        assertEquals(CLIENT_USER,actual);
        actual = service.getUserByUsernameOrEmail(CLIENT_USER.getEmail());
        assertEquals(CLIENT_USER,actual);
    }

    @Test
    void save() {
        when(repository.findByUsername(CLIENT_USER.getUsername())).thenReturn(Optional.empty());
        when(repository.findByEmail(CLIENT_USER.getEmail())).thenReturn(Optional.empty());
        when(repository.findById(CLIENT_USER.getUserId())).thenReturn(Optional.of(CLIENT_USER));
        when(repository.save(CLIENT_USER)).thenReturn(CLIENT_USER);
        ResponseEntity<HttpStatus> actual = service.save(CLIENT_USER);
        assertEquals(HttpStatus.OK,actual.getStatusCode());
        //TODO test for existing username and email
    }

    @Test
    void update() {
        when(repository.findById(CLIENT_USER.getUserId())).thenReturn(Optional.of(CLIENT_USER));
        when(repository.findById("")).thenReturn(Optional.empty());
        CLIENT_USER.setPassword("1234567");
        when(repository.save(CLIENT_USER)).thenReturn(CLIENT_USER);

        ResponseEntity<HttpStatus> actual = service.update(CLIENT_USER);
        assertEquals(HttpStatus.OK,actual.getStatusCode());

        //TODO test for existing username and email

        CLIENT_USER.setUserId("");
        try{
            actual = service.update(CLIENT_USER);
            fail("It should fail since the id is not present");
        }
        catch (UserException exception){
            assertEquals(HttpStatus.NOT_FOUND,exception.getStatus());
        }
    }

    @Test
    void loadUserByUsername() {
        when(repository.findByUsername(CLIENT_USER.getUsername())).thenReturn(Optional.of(CLIENT_USER));
        UserDetails actual = service.loadUserByUsername(CLIENT_USER.getUsername());
        assertEquals(CLIENT_USER.getAuthorities(),actual.getAuthorities());
    }

    @Test
    void getDetails() {
        when(repository.findById(CLIENT_USER.getUserId())).thenReturn(Optional.of(CLIENT_USER));
        ResponseEntity<com.userservice.userservice.Models.UserDetails>
                actual = service.getDetails(CLIENT_USER.getUserId());

        assertEquals(HttpStatus.OK,actual.getStatusCode());
        assertEquals(
                new com.userservice.userservice.Models.UserDetails(CLIENT_USER),
                actual.getBody()
                );

        CLIENT_USER.setUserId("");
        try{
            actual = service.getDetails(CLIENT_USER.getUserId());
            fail("It should fail since the id is not present");
        }
        catch (UserException exception){
            assertEquals(HttpStatus.NOT_FOUND,exception.getStatus());
        }
    }

    @Test
    void getEmployees() {
        when(repository.findByType(UserType.EMPLOYEE)).thenReturn(List.of(EMPLOYEE_USER));
        ResponseEntity<List<com.userservice.userservice.Models.UserDetails>>
                actual = service.getEmployees();
        assertEquals(HttpStatus.OK,actual.getStatusCode());
        assertEquals(1,actual.getBody().size());
    }
}