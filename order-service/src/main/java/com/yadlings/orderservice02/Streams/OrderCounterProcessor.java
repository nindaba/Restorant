package com.yadlings.orderservice02.Streams;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Models.OrderedItem;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.streams.processor.api.Processor;
import org.apache.kafka.streams.processor.api.ProcessorContext;
import org.apache.kafka.streams.processor.api.Record;
import org.apache.kafka.streams.state.KeyValueStore;

@NoArgsConstructor
@RequiredArgsConstructor
public class OrderCounterProcessor implements Processor<String, Order,String, OrderCount> {
    private ProcessorContext<String, OrderCount> context;
    private KeyValueStore<String, OrderCount> stateStore;
    @NonNull
    private String storeName;
    @Override
    public void init(ProcessorContext<String, OrderCount> context) {
        Processor.super.init(context);
        this.context = context;
        stateStore = context.getStateStore(storeName);
    }

    @Override
    public void process(Record<String, Order> record) {
        OrderCount orderCount = stateStore.get(record.value().getStatus().getLatestStatus());
        if(orderCount == null) orderCount = new OrderCount(record.value().getStatus().getLatestStatus());
        orderCount.addCount(1);
        orderCount.addAmount(record.value().getTotalPrice());
        orderCount.addItems(record.value().getOrderItems().stream().map(OrderedItem::getNumber).reduce(0,Integer::sum));
        stateStore.put(orderCount.getStatus(),orderCount);
        context.forward(new Record<>(orderCount.getStatus(),orderCount, record.value().getTimeCreated()));
    }
}