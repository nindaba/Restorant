import { BasketItem } from "../models/basket-item.model";
import { Item } from "../models/item.model";
import { OrderStatus } from "../models/order-status.model";
import { Order } from "../models/order.model";

export class InitialModels{
        public static ORDER_STATUS: OrderStatus={
                accepted: false,
                cooking: false,
                ready: false,
                served: false,
                payed: false,
                cancelMessage: ""
        }
        public static ORDER :Order = {
                orderId: "",
                clientId: "",
                orderItems: [],
                status: InitialModels.ORDER_STATUS,
                totalPrice: 0,
                timeCreated: 0,
                timeUpdated: 0
        }
        public static BASKET_ITEM :BasketItem ={
                itemId: "",
                number: 0,
                price: 0
        }
  static ITEM: Item = {
          image: "",
          category: "",
          price: 0,
          id: "",
          name: "",
          description: ""
  }
}