import { createReducer, on } from "@ngrx/store";
import { compare } from "src/app/common/order.common";
import { copy, logger } from "src/app/common/utils";
import { Order } from "src/app/models/order.model";
import * as OrderAction from "./order.action";
import { INITIAL_STATE } from "./order.initial";
import {OrderState, SelectedOrder } from "./order.model";

const updateOrders = (orders:Order[],order: Order):Order[]=>{
    let index = orders.findIndex(find => find.orderId == order.orderId);
	let toBeRemoved:Boolean = order.status.payed == true || order.status.cancelMessage.length > 0; // this is to check if status is complete
    if(index >-1) orders[index] = order;
    else orders.push(order);
	if(toBeRemoved && index >-1) orders.splice(index,1);
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
		// logger(metadata,"SELECTED IN REDUCER 33")
		stateCopy.isEmpty = false;
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(OrderAction.onError,(state:OrderState,metadata)=>{
		logger(metadata,"ERROR 38 REDUCER")
		return state;
	}),
	on(OrderAction.loadSelectedItems,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		stateCopy.selectedOrder.items.push(metadata.item);
		return !state.selectedOrder.isBasket || metadata.id !='INITIAL' ? stateCopy : state;
	}),
	on(OrderAction.addResponse,(state:OrderState,metadata)=>{
		let stateCopy = copy<OrderState>(state);
		// logger(metadata,"RESPONSE REDUCER 45 EMP");
		stateCopy.response.push(metadata.response);
		return stateCopy;
	}),

	on(OrderAction.onUserChanged,(state:OrderState,metadata)=>{
		return{...INITIAL_STATE,userId:metadata.userId};
	}),
)
export{
	OrderReducer
}
