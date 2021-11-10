package com.yadlings.orderservice02;

import com.yadlings.orderservice02.Service.KafkaService;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.reactive.config.EnableWebFlux;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.UUID;

@SpringBootApplication
@EnableWebFlux
@Log4j2
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
