package com.userservice.userservice.Repository;

import com.userservice.userservice.Documents.User;
import com.userservice.userservice.Models.UserType;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByType(UserType type);
}
