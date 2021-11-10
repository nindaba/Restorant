package com.yadlings.orderservice02.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.List;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private KafkaService kafkaService;
    /**
     * This will save an Order and return its new Id
     * @param order
     * @return Mono<String>
     */
    public Mono<String> save(Order order){
        return orderRepository.save(order)
                .flatMap(kafkaService::sendToTopics)
                .map(Order::getOrderId);
    }
    public Flux<Order> getAll(String clientId){
        return Flux.merge(orderRepository.findAll(), kafkaService.receive()
                .map(ReceiverRecord::value)
                .map(Order::deserialize))
                .filter(order -> clientId.equals(order.getClientId()));
    }
//    public ResponseEntity<Order> getByOrderId(String orderId){
//        return orderRepository
//                .findById(orderId)
//                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
//                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//    public ResponseEntity<Order> getByClientId(String clientId){
//        return orderRepository
//                .findByClientId(clientId)
//                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
//                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//    public ResponseEntity<HttpHeaders> deleteAll(){
//        orderRepository.deleteAll();
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//    public ResponseEntity<HttpHeaders> deleteById(String orderId){
//        orderRepository.deleteById(orderId);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//    public ResponseEntity<?> update(Order order){
//        return orderRepository
//                .findById(order.getOrderId())
//                .map(orderRepository::save)
//                .map(item -> new ResponseEntity<>(HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
}
