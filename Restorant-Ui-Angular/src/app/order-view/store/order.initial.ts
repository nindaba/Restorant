import { BasketItem } from "src/app/models/basket-item.model"
import { Item } from "src/app/models/item.model"
import { OrderStatus } from "src/app/models/order-status.model"
import { OrderTitle } from "src/app/models/order-title.model"
import { Order } from "src/app/models/order.model"
import { Count, OrderState, SelectedOrder } from "./order.model"

enum Common {
    FREATUE_KEY = 'order_store',
    LOAD_ORDERS = '[restorant api] load_orders',
    ORDERS_LOADED_SUCCESS = '[order effect] orders_loaded_success',
    INIT_TITLES = '[order effect] init_titles',
    INIT_ITEMS = "init_items",
    SET_SELECTED = "set_selected",
    INIT_SELECTED_ORDER = 'init_seleceted_order',
    LOAD_SELECTED_ITEMS = 'load_selected_items',
    INCREASE_ITEMS = "increase_items",
    DECREASE_ITEMS = "decrease_items",
    SEND_ORDER = 'send_order',
    ORDER_SEND_SUCCESS = 'order_send_success',
    SELECT_SUCCESS = "select_success",
    ON_ERROR = "on_error",
    DOUBLE = "DOUBLE"
}
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
        selectedIndex: -1
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
        Common,
        INITIAL_ORDER_TITLEL,
        INITIAL_STATE,
        INITIAL_ORDER,
        INITIAL_SELECTED_ORDER,
        INITIAL_ORDER_ITEM,
        INITIAL_STATUS
}