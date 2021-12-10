// interface BasketItem{

import { TypedAction } from "@ngrx/store/src/models";
import { Item } from "src/app/models/item.model";
import { OrderTitle } from "src/app/models/order-title.model";
import { Order } from "src/app/models/order.model";
import { Common } from "./order.initial";
interface Count{
        count:number;
}
interface SelectedOrder extends Order{
        items: (Item&Count)[];
        isBasket:Boolean;
}
interface OrderState{
        orders: Order[];
        titles:OrderTitle[];
        selectedOrder: SelectedOrder;
        selectedIndex:number;
        isEmpty: Boolean;
}
const copy = <T>(original:any):T => JSON.parse(JSON.stringify(original))
export {
        Count,
        SelectedOrder,
        OrderState,
        copy,
}
// let o =()=>{
//         let o:Order;
//         o.
// }