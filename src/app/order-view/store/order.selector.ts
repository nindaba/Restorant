import { createFeatureSelector, createSelector } from "@ngrx/store";
import { compare, extractLatestStatus, extractStatusIndex, extractTimestamp } from "src/app/common/order.common";
import { copy } from "src/app/common/utils";
import { Order } from "src/app/models/order.model";
import { Caller } from "src/app/models/response.module";
import { INITIAL_ORDER } from "./order.initial";
import { OrderState,Common } from "./order.model";

const getOrders = ()=> createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState) => state.orders
);
const getOrder = (id:string)=> createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState) => copy<Order[]>(state.orders).find(order=> order.orderId == id) 
        ||copy<Order[]>(state.orders).sort(compare)[0]
        || INITIAL_ORDER
);
const getSelected = ()=> createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState) => state.selectedOrder
);
const isUserChanged = (id:string)=> createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState) => state.userId != id ? id:'' 
);
const getTotal= ()=> createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState) => state.selectedOrder.items
        .map(item=>item.price*item.count)
        .reduce((current,acc)=>current+acc,0)
)
const isEmpty = ()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.isEmpty
)
const getStatus = ()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.selectedOrder.status
)
const getLatestStatus =()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> extractLatestStatus(state.selectedOrder.status)
)
const getStatusIndex =()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> extractStatusIndex(state.selectedOrder.status)
)
  /**
   * This will change the Orders into an object of OrderTitle
   * by extacting the orderId,status,time it was created and totalPrice
   * Note that the time is the time of update
   * @returns Array of OrderTitle
   */  
const getTitles = ()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.orders      
        .map((order:Order) => 
        ({
          status :extractLatestStatus(order.status),
          date :extractTimestamp(order.timeCreated).date,
          time :extractTimestamp(order.timeUpdated).time,
          orderId : order.orderId,
          totalPrice :order.totalPrice,
          timeUpdated: order.timeUpdated
      }))
)      //.sort(compare)
const isBasket =()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.selectedOrder.isBasket
)
const getSelectedId =()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.selectedOrder.orderId
)
const getResponse =(caller:Caller)=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.response
        .filter(resp=> resp.from == caller)
        .slice(-1)[0]
)
const noItem =()=>createSelector(
        createFeatureSelector(Common.FREATUE_KEY),
        (state:OrderState)=> state.selectedOrder.items.length ==0
)
export{
        noItem,
        getSelectedId,
        isBasket,
        getOrders,
        getSelected,
        getTotal,
        getOrder,
        isEmpty,
        getStatus,
        getLatestStatus,
        getTitles,
        getStatusIndex,
        getResponse,
        isUserChanged,
        compare,
}
