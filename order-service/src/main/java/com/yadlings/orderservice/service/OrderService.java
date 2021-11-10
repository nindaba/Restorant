package com.yadlings.orderservice.service;

import com.yadlings.orderservice.documents.Order;
import com.yadlings.orderservice.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServlet;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    public ResponseEntity<HttpHeaders> save(Order order){
        String orderId = orderRepository.save(order)
                .getOrderId();
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(
                ServletUriComponentsBuilder
                        .fromCurrentRequest()
                        .path("/{id}")
                        .build(orderId));
        return new ResponseEntity<>(headers, HttpStatus.OK);
    }

    public ResponseEntity<List<Order>> getAll(){
        List<Order> orders = orderRepository.findAll();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
    public ResponseEntity<Order> getByOrderId(String orderId){
        return orderRepository
                .findById(orderId)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    public ResponseEntity<Order> getByClientId(String clientId){
        return orderRepository
                .findByClientId(clientId)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    public ResponseEntity<HttpHeaders> deleteAll(){
        orderRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
    public ResponseEntity<HttpHeaders> deleteById(String orderId){
        orderRepository.deleteById(orderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    public ResponseEntity<?> update(Order order){
        return orderRepository
                .findById(order.getOrderId())
                .map(orderRepository::save)
                .map(item -> new ResponseEntity<>(HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
