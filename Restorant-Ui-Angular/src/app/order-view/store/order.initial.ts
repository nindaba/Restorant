import { BasketItem } from "src/app/models/basket-item.model"
import { Item } from "src/app/models/item.model"
import { OrderStatus } from "src/app/models/order-status.model"
import { OrderTitle } from "src/app/models/order-title.model"
import { Order } from "src/app/models/order.model"
import { Count, OrderState, SelectedOrder } from "./order.model"
const INITIAL_ORDER_TITLEL: OrderTitle ={
        orderId: "",
        date: "",
        time: "",
        totalPrice: 0,
        status: "",
        timeUpdated: 0
}
const INITIAL_STATUS: OrderStatus={
        accepted: false,
        cooking: false,
        ready: false,
        served: false,
        payed: false,
        cancelMessage: ""
}
const INITIAL_BASKET_ITEM: BasketItem ={
        itemId: "",
        number: 0,
        price: 0
}
const INITIAL_SELECTED_ORDER:SelectedOrder= {
        items: [],
        orderId: "",
        clientId: "",
        orderItems: [],
        status: INITIAL_STATUS,
        totalPrice: 0,
        timeCreated: 0,
        timeUpdated: 0,
        isBasket: false
}
const INITIAL_STATE:OrderState ={
        orders: [],
        titles: [],
        selectedOrder: INITIAL_SELECTED_ORDER,
        isEmpty: true,
        selectedIndex: -1,
        response: [],
        userId: ""
}
const INITIAL_ORDER: Order ={
        orderId: "",
        clientId: "",
        orderItems: [],
        status: INITIAL_STATUS,
        totalPrice: 0,
        timeCreated: 0,
        timeUpdated: 0
}
const INITIAL_ORDER_ITEM: Item&Count= {
        image: "",
        category: "",
        price: 0,
        id: "",
        name: "",
        description: "",
        count:0
}

export {
        INITIAL_ORDER_TITLEL,
        INITIAL_STATE,
        INITIAL_ORDER,
        INITIAL_SELECTED_ORDER,
        INITIAL_ORDER_ITEM,
        INITIAL_STATUS,
}