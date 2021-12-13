import { HttpResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import { Count, SelectedOrder,Common} from "./order.model";
import { Response } from "src/app/models/response.module";

const initTitles = createAction(Common.INIT_TITLES)
const setSelected = createAction(Common.SET_SELECTED,props<{id:string,order:SelectedOrder}>())
const initSelectedOrder = createAction(Common.INIT_SELECTED_ORDER,props<{id:string}>())
const loadSelectedItems = createAction(Common.LOAD_SELECTED_ITEMS,props<{id:string,item:Item&Count}>())
const selectedSuccess = createAction(Common.SELECT_SUCCESS,props<{payload:Item&Count}>())
const loadOrders = createAction(Common.LOAD_ORDERS)
const ordersLoadedSuccess = createAction(Common.ORDERS_LOADED_SUCCESS,props<{payload:Order}>())
const increaseItems = createAction(Common.INCREASE_ITEMS,props<{index:number}>())
const decreaseItems = createAction(Common.DECREASE_ITEMS,props<{index:number}>())
const sendOrder = createAction(Common.SEND_ORDER);
const orderSendSuccess = createAction(Common.ORDER_SEND_SUCCESS,props<{response:HttpResponse<any>}>());
const onError = createAction(Common.ON_ERROR,props<{message:string}>());
const addResponse = createAction(Common.ON_RESPONSE,props<{response:Response}>());
const setBasket = createAction(Common.SET_BASKET,props<{isBasket:Boolean}>());

export{
        setBasket,
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
        loadSelectedItems,
        addResponse,
}