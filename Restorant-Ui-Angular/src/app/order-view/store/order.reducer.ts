import { createReducer, on, State } from "@ngrx/store";
import { BasketItem } from "src/app/models/basket-item.model";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import * as OrderAction from "./order.action";
import { setSelected } from "./order.action";
import { INITIAL_STATE } from "./order.initial";
import {copy, Count, OrderState, SelectedOrder } from "./order.model";

const updateOrders = (orders:Order[],order: Order):Order[]=>{
    let index = orders.findIndex(find => find.orderId == order.orderId);
    if(index >-1) orders[index] = order;
    else orders.push(order);
	return orders;
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
			stateCopy.isEmpty = false;
			return stateCopy;
		}
	),
	on(OrderAction.setSelected,(state:OrderState,metadata)=> {
		let stateCopy = copy<OrderState>(state);
		let selectedOrder = copy<SelectedOrder>(stateCopy.selectedOrder);
		selectedOrder.items = metadata.order.items;
		selectedOrder.isBasket = metadata.order.isBasket;
		//we covert the items to basket items since that is whatthe api requies
		selectedOrder.orderItems = metadata.order.items
		.map((item:Item&Count):BasketItem => ({
			itemId: item.id,
			number: item.count,
			price: item.price
		}))
		stateCopy.selectedOrder = selectedOrder;
		stateCopy.isEmpty = false;
		return stateCopy;
	}),
	on(OrderAction.increaseItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy
		.selectedOrder
		.items[metadata.index]
		.count++
		return stateCopy;
	}),
	on(OrderAction.decreaseItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy
		.selectedOrder
		.items[metadata.index]
		.count--
		return stateCopy.selectedOrder.items[metadata.index].count > 0 ? stateCopy: state;
	}),
	on(OrderAction.orderSendSuccess,(state:OrderState,metadata)=>{
		console.log(metadata.response)
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
		let selectedOrder = copy<SelectedOrder>(stateCopy.selectedOrder);
		selectedOrder.items.push(metadata.item);
		stateCopy.selectedOrder = selectedOrder;
		// console.log()
		return stateCopy;
	}),
)
export{
	OrderReducer
}
