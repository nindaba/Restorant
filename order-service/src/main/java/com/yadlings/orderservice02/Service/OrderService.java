package com.yadlings.orderservice02.Service;
import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderItem;
import com.yadlings.orderservice02.Repository.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Comparator;
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
     * @return Mono <String>
     */
    public Mono<String> save(Order order){
        //todo validate, check if the order has at least one item. if not return a mono of Exception Response
        //but later as we need empty order to save time in production
        return orderRepository
                .save(order)
                .flatMap(kafkaService::sendToClient);
    }
    /**
     * This will fetch all the records in the database and merge
     * with the new records which are being edited and passed to kafka
     * @return Flux<Order>
     */
    public Flux<Order> getOrders(){
        return Flux.merge(
                orderRepository.findAll()
                        .sort(Comparator
                        .comparingLong(Order::getTimeUpdated)
                        .reversed()),
                kafkaService.receive());
    }
    /**
     * This will update the record in the database if it is present
     * and send it to kafka to be recorgnized as an update
     * @param order
     * @return Mono<ORDER>
     */
    public Mono<String> update(Order order) {
        return orderRepository
                .findById(order.getOrderId())
                .flatMap(foundOrder-> orderRepository.save(order))
                .flatMap(kafkaService::sendToClient);
    }

    /**
     * This will fetch all the records related to the client in the database and merge
     * with the new records which are being edited and passed to kafka
     * @param clientId
     * @return Flux<Order>
     */
    public Flux<Order> getOrders(String clientId){
        return Flux.merge(
                orderRepository.findByClientId(clientId)
                        .sort(Comparator
                                .comparingLong(Order::getTimeUpdated)
                                .reversed()),
                kafkaService.receive()
                        .filter(order -> order.getClientId().endsWith(clientId)) //Note that the broker is not for one client, therefore I have to filter the orders for the client
        );
    }

    /**
     *
     * @return Orders which have not been canceled or payed
     */
    public Flux<Order> getOrdersInProcess() {
        return  Flux.merge(
                orderRepository.findAll()
                        .sort(Comparator
                                .comparingLong(Order::getTimeUpdated)
                                .reversed())
                        .filter(order -> !order.getStatus().getPayed()
                            && order.getStatus().getCancelMessage().equals("")),
                kafkaService.receive() /** we don't filter out the complete status since we want to niffy the client that it got changed*/
        );



//                .filter(order -> !order.getStatus().getPayed()
//                        && order.getStatus().getCancelMessage().equals(""));
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
