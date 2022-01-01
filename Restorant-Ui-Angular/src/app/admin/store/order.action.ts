import { HttpResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import { Count, SelectedOrder,Common, OrderCount} from "./order.model";
import { Response } from "src/app/models/response.module";
import { OrderStatus } from "src/app/models/order-status.model";
import { BasketItem } from "src/app/models/basket-item.model";

//Order actions
const setSelected = createAction(Common.SET_SELECTED,props<{id:string,order:SelectedOrder}>())
const initSelectedOrder = createAction(Common.INIT_SELECTED_ORDER,props<{id:string}>())
const loadSelectedItems = createAction(Common.LOAD_SELECTED_ITEMS,props<{id:string,item:Item&Count}>())
const selectedSuccess = createAction(Common.SELECT_SUCCESS,props<{payload:Item&Count}>())
const loadOrders = createAction(Common.LOAD_ORDERS)
const ordersLoadedSuccess = createAction(Common.ORDERS_LOADED_SUCCESS,props<{payload:Order}>())
const updateOrder = createAction(Common.UPDATE_ORDER);
const orderUpdateSuccess = createAction(Common.ORDER_UPDATE_SUCCESS,props<{response:HttpResponse<any>}>());
const onError = createAction(Common.ON_ERROR,props<{message:string}>());
const addResponse = createAction(Common.ON_RESPONSE,props<{response:Response}>());
const isUserChanged = createAction(Common.CHECH_USER);
const onUserChanged = createAction(Common.USER_CHANGED,props<{userId:string}>());
const updateStatus = createAction(Common.UPDATE_ORDER,props<{status:OrderStatus}>());

//Performance Actions
const loadOrderCounter = createAction(Common.LOAD_ORDER_COUNT);
const orderCounterLoaded = createAction(Common.ORDER_COUNTER_LOADED,props<{orderCount:OrderCount}>());
const loadMostSold = createAction(Common.LOAD_MOST_SOLD);
const mostSoldLoaded = createAction(Common.MOST_SOLD_LOADED,props<{mostSold:BasketItem[]}>());
export{
        //Order actions
        updateStatus,
        onUserChanged,
        isUserChanged,
        loadOrders,
        ordersLoadedSuccess,
        setSelected,
        orderUpdateSuccess,
        initSelectedOrder,
        updateOrder,
        selectedSuccess,
        onError,
        loadSelectedItems,
        addResponse,

        //Performance Actions
        loadOrderCounter,
        orderCounterLoaded,
        loadMostSold,
        mostSoldLoaded
}