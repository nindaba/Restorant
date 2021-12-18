import { BasketItem } from "../models/basket-item.model";
import { CategoryItem } from "../models/category-item.model";
import { Item } from "../models/item.model";
import { OrderStatus } from "../models/order-status.model";
import { Order } from "../models/order.model";
import { Token } from "../models/token.model";
export class InitialModels{
        public static INITIAL_TOKEN:Token ={
                sub: "",
                iss: "",
                exp: 0,
                iat: 0,
                payload: {
                        userId: "",
                        userType: "",
                        username: ""
                }
        }
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
                timeUpdated: 0,
                username: ""
        }
        public static BASKET_ITEM :BasketItem ={
                itemId: "",
                number: 0,
                price: 0
        }
        public static ITEM: Item = {
                image: "",
                category: "",
                price: 0,
                id: "",
                name: "",
                description: ""
        }
        public static CATEGORY_ITEM: CategoryItem ={
                image: "",
                items: [],
                id: "",
                name: "",
                description: ""
        }
}