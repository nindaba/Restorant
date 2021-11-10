package com.yadlings.orderservice02.Controller;

import com.yadlings.orderservice02.Service.KafkaService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.kafka.receiver.ReceiverRecord;


@RestController
@RequestMapping(value="/order")
@AllArgsConstructor
@Log4j2
public class ReactController {
    private KafkaService service;

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    private Flux<String> getRecord(){
//        return Flux.range(1, 100000000)
//                .map(index -> index + id)
//                .delayElements(Duration.ofSeconds(2L));
        return service.receive()
                .map(ReceiverRecord::value);
    }
    @PostMapping(value="/{key}/{value}")
    private void saveRecord(
            @PathVariable("key") Integer key,
            @PathVariable("value") String value){
        service.sender()
                .createOutbound()
                .send(Flux.just(new ProducerRecord<Integer,String>("react",key,value)))
                .then()
                .doOnError(error -> log.info("Error while sending to topic {}",error))
                .doOnSuccess(success-> log.info("Sent to kafka {}",success))
                .subscribe();
    }
}
