package com.yadlings.orderservice02.Repository;

import com.yadlings.orderservice02.Documents.Order;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
@Repository
public interface OrderRepository extends ReactiveMongoRepository<Order,String> {
    Flux<Order> findByClientId(String clientId);
}
