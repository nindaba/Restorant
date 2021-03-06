import { createReducer, on } from "@ngrx/store";
import { compare } from "src/app/common/order.common";
import { copy, logger } from "src/app/common/utils";
import { Order } from "src/app/models/order.model";
import * as OrderAction from "./order.action";
import { INITIAL_STATE, INITIAL_STATUS } from "./order.initial";
import {OrderState, SelectedOrder } from "./order.model";

const updateOrders = (orders:Order[],order: Order):Order[]=>{
    let index = orders.findIndex(find => find.orderId == order.orderId);
    if(index >-1) orders[index] = order;
    else orders.push(order);
	return orders.sort(compare);
  }
const OrderReducer = createReducer(
	INITIAL_STATE,
	on(OrderAction.ordersLoadedSuccess,
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
	on(OrderAction.setSelected,(state:OrderState,metadata)=> {
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder = metadata.order;
		stateCopy.isEmpty = false;
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(OrderAction.increaseItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy
		.selectedOrder
		.items[metadata.index] // we can use item id to change to prevent bugs
		.count++
		stateCopy.selectedOrder.isBasket = true; // because it want to be  sent
		return stateCopy;
	}),
	on(OrderAction.decreaseItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy
		.selectedOrder
		.items[metadata.index]
		.count--
		stateCopy.selectedOrder.isBasket = true; // because it want to be  sent
		return stateCopy.selectedOrder.items[metadata.index].count > 0 ? stateCopy: state;
	}),
	on(OrderAction.orderSendSuccess,(state:OrderState,metadata)=>{
		logger(metadata.response,'TODO ORDER SEND SUCCESS')
		return state;
	}),
	// on(OrderAction.selectedSuccess,(state:OrderState,metadata)=>{
	// 	console.log(metadata.payload)
	// 	let stateCopy = copy<OrderState>(state);
	// 	stateCopy.selectedOrder = metadata.payload;
	// 	return state;
	// }),
	on(OrderAction.onError,(state:OrderState,metadata)=>{
		console.log(metadata.message)
		return state;
	}),
	on(OrderAction.loadSelectedItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder.items.push(metadata.item);
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(OrderAction.addResponse,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy.response.push(metadata.response);
		return stateCopy;
	}),
	on(OrderAction.setBasket,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder.isBasket = metadata.isBasket;
		return metadata.isBasket? stateCopy : state;
	}),
	on(OrderAction.onUserChanged,(state:OrderState,metadata)=>{
		return{...INITIAL_STATE,userId:metadata.userId};
	}),
)
export{
	OrderReducer
}
