import { createReducer, on } from "@ngrx/store";
import { compare } from "src/app/common/order.common";
import { copy, logger } from "src/app/common/utils";
import { Order } from "src/app/models/order.model";
import * as Actions from "./order.action";
import { INITIAL_ORDER_STATE, INITIAL_PERFORMANCE_STATE} from "./order.initial";
import {OrderCount, OrderState, PerformanceState, SelectedOrder } from "./order.model";
/**
 * this will check if the order already exist in the array and replace it 
 * or add it to the array
 * @param orders 
 * @param order 
 * @returns orders an updated Orders array with the new order added
 */
const updateOrders = (orders:Order[],order: Order):Order[]=>{
    let index = orders.findIndex(find => find.orderId == order.orderId);
	let toBeRemoved:Boolean = order.status.payed == true || order.status.cancelMessage.length > 0; // this is to check if status is complete
    if(index >-1) orders[index] = order;
    else orders.push(order);
	if(toBeRemoved && index >-1) orders.splice(index,1);
	return orders.sort(compare);
  }
/**
 * Order Reduce Function
 */
const OrderReducer = createReducer(
	INITIAL_ORDER_STATE,
	on(Actions.ordersLoadedSuccess,
		(state:OrderState,metadata) =>{
			let stateCopy = copy<OrderState>(state);
			stateCopy.orders = updateOrders(
				stateCopy.orders,
				metadata.payload
			)
			if(state.selectedOrder.orderId == metadata.payload.orderId) //update the status since it is the only thing which changes
			stateCopy.selectedOrder.status = metadata.payload.status
			stateCopy.isEmpty = false;
			return stateCopy;
		}
	),
	on(Actions.setSelected,(state:OrderState,metadata)=> {
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder = metadata.order;
		// logger(metadata,"SELECTED IN REDUCER 33")
		stateCopy.isEmpty = false;
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(Actions.onError,(state:OrderState,metadata)=>{
		logger(metadata,"ERROR 38 REDUCER")
		return state;
	}),
	on(Actions.loadSelectedItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder.items.push(metadata.item);
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(Actions.addResponse,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		// logger(metadata,"RESPONSE REDUCER 45 EMP");
		stateCopy.response.push(metadata.response);
		return stateCopy;
	}),

	on(Actions.onUserChanged,(state:OrderState,metadata)=>{
		return{...INITIAL_ORDER_STATE,userId:metadata.userId};
	}),
);



/**
 * this will check if the order counter already exist in the array and replace it 
 * or add it to the array
 * @param orderCounters 
 * @param order 
 * @returns OrderCounter with the new order
 */
const updateOrderCounters = (orderCounters:OrderCount[],order: OrderCount):OrderCount[]=>{
    let index = orderCounters.findIndex(find => find.status== order.status);
    if(index >-1) orderCounters[index] = order;
    else orderCounters.push(order);
	return orderCounters;
  }
/**
 * Performance Reducer Function
 */
const PerformanceReducer = createReducer(
	INITIAL_PERFORMANCE_STATE,
	on(Actions.orderCounterLoaded,(state:PerformanceState,metadata) => {
		let newState:PerformanceState = copy(state);
		newState.orderCounter = updateOrderCounters(
			newState.orderCounter,
			metadata.orderCount
		)
		return newState;
	})
);


export{
	OrderReducer,
	PerformanceReducer
}
