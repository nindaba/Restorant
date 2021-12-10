import { HttpResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import { Common } from "./order.initial";
import { Count, SelectedOrder } from "./order.model";

const initTitles = createAction(Common.INIT_TITLES)
const setSelected = createAction(Common.SET_SELECTED,props<{order:SelectedOrder}>())
const initSelectedOrder = createAction(Common.INIT_SELECTED_ORDER,props<{index:number}>())
const loadSelectedItems = createAction(Common.LOAD_SELECTED_ITEMS,props<{item:Item&Count}>())
const selectedSuccess = createAction(Common.SELECT_SUCCESS,props<{payload:Item&Count}>())
const loadOrders = createAction(Common.LOAD_ORDERS)
const ordersLoadedSuccess = createAction(Common.ORDERS_LOADED_SUCCESS,props<{payload:Order}>())
const increaseItems = createAction(Common.INCREASE_ITEMS,props<{index:number}>())
const decreaseItems = createAction(Common.DECREASE_ITEMS,props<{index:number}>())
const sendOrder = createAction(Common.SEND_ORDER);
const orderSendSuccess = createAction(Common.ORDER_SEND_SUCCESS,props<{response:HttpResponse<any>}>());
const onError = createAction(Common.ON_ERROR,props<{message:string}>());

export{
        initTitles,
        loadOrders,
        ordersLoadedSuccess,
        setSelected,
        increaseItems,
        decreaseItems,
        sendOrder,
        orderSendSuccess,
        initSelectedOrder,
        selectedSuccess,
        onError,
        loadSelectedItems
}