package com.yadlings.orderservice02.Streams;

import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Models.OrderItem;
import com.yadlings.orderservice02.Serdes.KafkaSerdes;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.StoreQueryParameters;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.state.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.EnableKafkaStreams;
import org.springframework.kafka.config.StreamsBuilderFactoryBean;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.yadlings.orderservice02.Models.Constants.COUNTER_STORE;
import static com.yadlings.orderservice02.Models.Constants.MOST_SOLD_STORE;

@Log4j2
@Service
@EnableKafkaStreams
public class OrderStreams {
    @Value("${kafka.topic.client}")
    private String CLIENT_TOPIC;
    @Value("${kafka.topic.order-counter}")
    private String COUNTED_TOPIC;
    @Value("${kafka.topic.most-sold}")
    private String MOST_SOLD_TOPIC;
    
    
    private StreamsBuilderFactoryBean factoryBean;
    StoreBuilder<KeyValueStore<String, OrderCount>> counterStoreBuilder;
    StoreBuilder<KeyValueStore<String, List<OrderItem>>> mostSoldStoreBuilder;
    public OrderStreams(StreamsBuilderFactoryBean factoryBean){
        this.factoryBean = factoryBean;
        counterStoreBuilder = Stores.keyValueStoreBuilder(
                Stores.inMemoryKeyValueStore(COUNTER_STORE),
                Serdes.String(),
                KafkaSerdes.OrderCount());
        mostSoldStoreBuilder = Stores.keyValueStoreBuilder(
                Stores.inMemoryKeyValueStore(MOST_SOLD_STORE),
                Serdes.String(),
                KafkaSerdes.OrderItem());
    }
    
    
    @Bean
    public Topology Streams(StreamsBuilder streamsBuilder){
        return streamsBuilder
                .build()
                
                //SOURCES
                .addSource("orders", Serdes.String().deserializer(), KafkaSerdes.Order().deserializer(),CLIENT_TOPIC)

                //PROCESSORS
                .addProcessor("order-counter-processor",OrderCounterProcessor::new,"orders")
                .addProcessor("most-sold-processor",MostSoldProcessor::new,"orders")

                //STORES
                .addStateStore(counterStoreBuilder,"order-counter-processor")
                .addStateStore(mostSoldStoreBuilder,"most-sold-processor")
                
                //SINKS --save
                .addSink("save-counted",COUNTED_TOPIC, Serdes.String().serializer(), KafkaSerdes.OrderCount().serializer(),"order-counter-processor")
                .addSink("save-most-sold",MOST_SOLD_TOPIC, Serdes.String().serializer(), KafkaSerdes.OrderItem().serializer(),"most-sold-processor");
    }
    
    


    public ReadOnlyKeyValueStore<String, OrderCount> getOrderCountStore(){
        return factoryBean.getKafkaStreams()
                .store(StoreQueryParameters.fromNameAndType(
                                COUNTER_STORE,
                                QueryableStoreTypes.keyValueStore()
                        ));
    }
    public ReadOnlyKeyValueStore<String, List<OrderItem>> getOrderItemsStore() {
        return factoryBean.getKafkaStreams()
                .store(StoreQueryParameters.fromNameAndType(
                        MOST_SOLD_STORE,
                        QueryableStoreTypes.keyValueStore()
                ));
    }
    
    @Bean
    private NewTopic orderCounterTopic(){
        return TopicBuilder
                .name(COUNTED_TOPIC)
                .partitions(1)
                .replicas(3)
                .build();
    }
    
    @Bean
    private NewTopic mostSoldTopic(){
        return TopicBuilder
                .name(MOST_SOLD_TOPIC)
                .partitions(1)
                .replicas(3)
                .build();
    }
}
