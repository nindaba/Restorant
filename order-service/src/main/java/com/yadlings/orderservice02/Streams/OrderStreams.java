package com.yadlings.orderservice02.Streams;

import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Serdes.KafkaSerdes;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
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

import java.util.Properties;

import static com.yadlings.orderservice02.Models.Constants.COUNTER_STORE;

@Log4j2
@Service
@EnableKafkaStreams
@RequiredArgsConstructor
public class OrderStreams {
    @Value("${kafka.topic.client}")
    private String CLIENT_TOPIC;
    @Value("${kafka.topic.order-counter}")
    private String COUNTED_TOPIC;

    @NonNull private StreamsBuilderFactoryBean factoryBean;

    @Bean
    public Topology Streams(StreamsBuilder streamsBuilder){
        KeyValueBytesStoreSupplier counterSupplier = Stores.inMemoryKeyValueStore(COUNTER_STORE);
        StoreBuilder<KeyValueStore<String, OrderCount>> counterStoreBuilder = Stores.keyValueStoreBuilder(counterSupplier, Serdes.String(), KafkaSerdes.OrderCount());
        return streamsBuilder
                .build()
                .addSource("orders", Serdes.String().deserializer(), KafkaSerdes.Order().deserializer(),CLIENT_TOPIC)
                .addProcessor("order-counter-processor",()-> new OrderCounterProcessor(COUNTER_STORE),"orders")
                .addStateStore(counterStoreBuilder,"order-counter-processor")
                .addSink("save-counted",COUNTED_TOPIC, Serdes.String().serializer(), KafkaSerdes.OrderCount().serializer(),"order-counter-processor");
    }

    public ReadOnlyKeyValueStore<String, OrderCount> getOrderCountStore(){
        return factoryBean.getKafkaStreams()
                .store(StoreQueryParameters.fromNameAndType(
                                COUNTER_STORE,
                                QueryableStoreTypes.keyValueStore()
                        ));
    }

    @Bean
    private NewTopic orderCounterTopic(){
        return TopicBuilder
                .name(COUNTED_TOPIC)
                .partitions(1)
                .replicas(1)
                .build();
    }

}
