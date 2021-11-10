package com.yadlings.orderservice02.Repository;

import com.yadlings.orderservice02.Documents.Order;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface OrderRepository extends ReactiveMongoRepository<Order,String> {
}
