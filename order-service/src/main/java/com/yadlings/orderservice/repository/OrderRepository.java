package com.yadlings.orderservice.repository;

import com.mongodb.client.MongoIterable;
import com.yadlings.orderservice.documents.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order,String> {
    Optional<Order> findByClientId(String clientId);
}
