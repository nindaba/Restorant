package com.yadlings.orderservice02.Streams;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderItem;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.kafka.streams.processor.api.Processor;
import org.apache.kafka.streams.processor.api.ProcessorContext;
import org.apache.kafka.streams.processor.api.Record;
import org.apache.kafka.streams.state.KeyValueStore;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.yadlings.orderservice02.Models.Constants.MOST_SOLD_STORE;
@Log4j2
@NoArgsConstructor
public class MostSoldProcessor implements Processor<String, Order,String, List<OrderItem>> {
    private final String KEY = "TOP_10";
    private KeyValueStore<String,List<OrderItem>> store;
    ProcessorContext<String, List<OrderItem>> context;
    @Override
    public void init(ProcessorContext<String, List<OrderItem>> context) {
        Processor.super.init(context);
        this.context = context;
        store = context.getStateStore(MOST_SOLD_STORE);
    }

    @Override
    public void process(Record<String, Order> record) {
        if(!record.value().getStatus().getAccepted()) { //we count if it is a new order
            if(store.get(KEY) == null) store.put(KEY,record.value().getOrderItems());
            List<OrderItem> storedItems = store.get(KEY);

            record.value().getOrderItems().forEach(item -> storedItems.add( //Add the updated OrderItem
                    storedItems.stream()
                            .filter(orderItem -> item.getItemId().equals(orderItem.getItemId())).findFirst()
                            .map(orderItem -> {
                                orderItem.update(item.getNumber(), item.getPrice());

                                //we remove the old order count
                                storedItems.removeIf(oldItem -> oldItem.getItemId().equals(item.getItemId()));
                                return orderItem;
                            })
                            .orElseGet(()->{
                                return item; //as there is nothing to update we return the new item
                            })));

            List<OrderItem> topTenItems = storedItems.stream()
                    .sorted(Comparator.comparingInt(OrderItem::getNumber).reversed())
                    .limit(10)
                    .collect(Collectors.toList());
            store.put(KEY,topTenItems);
            context.forward(new Record<>(KEY, topTenItems, record.timestamp()
            ));
        }
    }
}
