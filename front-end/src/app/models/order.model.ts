import { BasketItem } from "./basket-item.model";
import { OrderStatus } from "./order-status.model";

export interface Order{
    orderId:string,
    clientId:string,
    orderItems: Array<BasketItem>,
    status: OrderStatus,
    totalPrice:number,
    timeCreated:number,
    timeUpdated:number,
}