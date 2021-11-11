package com.yadlings.orderservice02.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yadlings.orderservice02.Common.OrderResponseTransformer;
import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.UpdateResponse;
import com.yadlings.orderservice02.Repository.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.ReceiverRecord;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
@Log4j2
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
    /**
     * This will fetch all the records in the database and merge
     * with the new records which are being edited and passed to kafka
     * @return Flux<Order>
     */
    public Flux<Order> getAll(){
        return Flux.merge(orderRepository.findAll(), kafkaService.receive()
                .map(ReceiverRecord::value)
                .map(Order::deserialize));
    }
    /**
     * This will update the record in the database if it is present
     * and send it to kafka to be recorgnized as an update
     * @param order
     * @return Mono<UpdateResponse>
     */
    public Mono<UpdateResponse> update(Order order) {
        return orderRepository
                .findById(order.getOrderId())
                .map(foundOrder-> orderRepository.save(order))
                .flatMap(kafkaService::sendToClient)
                .map(this::transformToUpdateResponse);
    }
    private UpdateResponse transformToUpdateResponse(Order order){
        return new UpdateResponse(
                "Order with Id "+order.getOrderId()+" Was Updated",
                "UPDATE",
                HttpStatus.OK,
                LocalDateTime.now().toString());
    }
    private UpdateResponse notFoundResponse(){ 
        return new UpdateResponse(
                "Order to update was not found",
                "UPDATE",
                HttpStatus.NOT_FOUND,
                LocalDateTime.now().toString());
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
