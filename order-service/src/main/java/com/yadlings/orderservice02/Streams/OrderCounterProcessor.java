package com.yadlings.orderservice02.Streams;

import com.yadlings.orderservice02.Documents.Order;
import com.yadlings.orderservice02.Models.OrderCount;
import com.yadlings.orderservice02.Models.OrderItem;
import lombok.NoArgsConstructor;
import org.apache.kafka.streams.processor.api.Processor;
import org.apache.kafka.streams.processor.api.ProcessorContext;
import org.apache.kafka.streams.processor.api.Record;
import org.apache.kafka.streams.state.KeyValueStore;

import static com.yadlings.orderservice02.Models.Constants.COUNTER_STORE;

@NoArgsConstructor
public class OrderCounterProcessor implements Processor<String, Order,String, OrderCount> {
    private ProcessorContext<String, OrderCount> context;
    private KeyValueStore<String, OrderCount> stateStore;
    @Override
    public void init(ProcessorContext<String, OrderCount> context) {
        Processor.super.init(context);
        this.context = context;
        stateStore = context.getStateStore(COUNTER_STORE);
    }

    @Override
    public void process(Record<String, Order> record) {
        OrderCount orderCount = stateStore.get(record.value().getStatus().getLatestStatus());
        if(orderCount == null) orderCount = new OrderCount(record.value().getStatus().getLatestStatus());
        orderCount.addCount(1);
        orderCount.addAmount(record.value().getTotalPrice());
        orderCount.addItems(record.value().getOrderItems().stream().map(OrderItem::getNumber).reduce(0,Integer::sum));
        stateStore.put(orderCount.getStatus(),orderCount);
        context.forward(new Record<>(orderCount.getStatus(),orderCount, record.value().getTimeCreated()));
    }
}