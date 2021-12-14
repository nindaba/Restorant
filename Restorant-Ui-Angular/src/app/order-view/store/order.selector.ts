import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderStatus } from "src/app/models/order-status.model";
import { Order } from "src/app/models/order.model";
import { Caller } from "src/app/models/response.module";
import { INITIAL_ORDER } from "./order.initial";
import { copy, OrderState,Common } from "./order.model";

/**
   * @param OrderStatus
   * This follows the order of essential status and checks which one is true first,
   * if the last is true and the first is true: of couse it will return the first
   * The Order is as follow and it will return one if true
   * 
   * 0. cancelled
   * 1. payed
   * 2. served
   * 3. ready
   * 4. cooking 
   * 5. accepted
   * 6. New Order
   * 
   * @returns String of status
  */
const extractLatestStatus = (status:OrderStatus):string => status
        .cancelMessage ? "canceled":
        status.payed ? "Payed": 
        status.served ? "Served":
        status.ready ? "Ready":
        status.cooking ? "Cooking":
        status.accepted ? "Accepted":
        "New Order";
const extractStatusIndex = (status:OrderStatus):number => status
        .cancelMessage ? 6:
        status.payed ? 5: 
        status.served ? 4:
        status.ready ? 3:
        status.cooking ? 2:
        status.accepted ? 1:
        0;
 /**
   * This takes in timestamp and converts it to JS Date,
   * remove the seconds part of the date 
   * splits the date and time
   * @param timestamp 
   * @returns Object of {date:string,time:string}
   */
const extractTimestamp = (timestamp:number):{date:string,time:string} =>{
        let dateTime : {date:string,time:string} = {date:'',time:''};
        [dateTime.date,dateTime.time] = new Date(timestamp)
        .toISOString()
        .substring(0,16)
        .split("T");
        return dateTime;
      }
const compare = (a:any,b:any)=> b.timeUpdated-a.timeUpdated
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
        (state:OrderState)=> !state.selectedOrder.isBasket && state.isEmpty
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
        compare
}
