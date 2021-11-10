package com.yadlings.orderservice.service;

import com.yadlings.orderservice.documents.Order;
import com.yadlings.orderservice.model.OrderedItem;
import com.yadlings.orderservice.repository.OrderRepository;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.rmi.server.UID;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.fasterxml.jackson.databind.jsonFormatVisitors.JsonValueFormat.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Log4j2
class OrderServiceTest {
    private OrderService orderService;
    private OrderRepository orderRepository;
    private Order order;
    private static final String CLIENT_ID = "6181b8e77fb1ee5dd94e7dad";
    private static final String ORDER_ID = "6181b8e77fb1ee5dd94e7dad";

    @BeforeEach
    void setUp() {
        orderRepository = mock(OrderRepository.class);
        orderService = new OrderService(orderRepository);
        order = new Order(CLIENT_ID);
        order.setOrderId(ORDER_ID);
        order.getOrderItems().add(new OrderedItem("1",1,2.0));
        order.getOrderItems().add(new OrderedItem("2",2,4.0));
        order.getOrderItems().add(new OrderedItem("3",3,3.0));
    }

    @Test
    void TestSave() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("http://localhost/"+ORDER_ID));
        ResponseEntity<HttpHeaders> expectedResponse = new ResponseEntity<>(headers, HttpStatus.OK);
        when(orderRepository.save(order)).thenReturn(order);
        assertEquals(expectedResponse,orderService.save(order));
        verify(orderRepository).save(order);

    }
    @Test
    void TestUpdate(){
        Order updateOrder = order;
        Optional<Order> optionalOrder = Optional.of(updateOrder);
        when(orderRepository.findById(updateOrder.getOrderId()))
                .thenReturn(optionalOrder);
        when(orderRepository.save(updateOrder))
                .thenReturn(updateOrder);

        //Test for a saved order
        updateOrder.setClientId("1234556");
        assertEquals(new ResponseEntity<>(HttpStatus.OK), orderService.update(updateOrder));
        verify(orderRepository)
                .findById(updateOrder.getOrderId());
        verify(orderRepository)
                .save(updateOrder);

        //Test for unsaved order
        updateOrder.setOrderId("not");
        updateOrder.setClientId("1234556");
        assertEquals(new ResponseEntity<>(HttpStatus.NOT_FOUND),orderService.update(updateOrder));
        verify(orderRepository)
                .findById(updateOrder.getOrderId());
    }
    @Test
    void TestGetAll() {
        ResponseEntity<List<Order>> expectedResponse =
                new ResponseEntity<>(Arrays.asList(order), HttpStatus.OK);
        when(orderRepository.findAll()).thenReturn(Arrays.asList(order));
        assertEquals(expectedResponse,orderService.getAll());
        verify(orderRepository).findAll();
    }

    @Test
    void TestGetByOrderId() {
        Optional<Order> optionalOrder = Optional.of(order);
        when(orderRepository.findById(order.getOrderId()))
                .thenReturn(optionalOrder);

        ResponseEntity<Order> expectedResponse =
                new ResponseEntity<>(order, HttpStatus.OK);
        assertEquals(expectedResponse,orderService.getByOrderId(order.getOrderId()));
        verify(orderRepository).findById(order.getOrderId());
    }

    @Test
    void TestGetByClientId() {
        Optional<Order> optionalOrder = Optional.of(order);
        when(orderRepository.findByClientId(order.getClientId()))
                .thenReturn(optionalOrder);

        ResponseEntity<Order> expectedResponse =
                new ResponseEntity<>(order, HttpStatus.OK);
        assertEquals(expectedResponse,orderService.getByClientId(order.getClientId()));
        verify(orderRepository).findByClientId(order.getClientId());
    }

    @Test
    void deleteAll() {
        doNothing().when(orderRepository).deleteAll();
        ResponseEntity<Order> expectedResponse =
                new ResponseEntity<>(HttpStatus.OK);
        assertEquals(expectedResponse,orderService.deleteAll());
        verify(orderRepository).deleteAll();
    }

    @Test
    void deleteById() {
        Optional<Order> optionalOrder = Optional.of(order);
        when(orderRepository.findByClientId(order.getClientId()))
                .thenReturn(optionalOrder);
        doNothing().when(orderRepository).deleteById(order.getOrderId());

        ResponseEntity<Order> expectedResponse =
                new ResponseEntity<>(HttpStatus.OK);
        assertEquals(expectedResponse,orderService.deleteById(order.getClientId()));
        verify(orderRepository).deleteById(order.getClientId());
    }
}