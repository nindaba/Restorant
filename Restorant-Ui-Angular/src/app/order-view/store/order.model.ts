import { Item } from "src/app/models/item.model";
import { OrderTitle } from "src/app/models/order-title.model";
import { Order } from "src/app/models/order.model";
import { Caller,Response } from "src/app/models/response.module";
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
        DOUBLE = "learning_double_actions",
        ON_RESPONSE = "on_response",
        SET_BASKET = "SET_BASKET"
}
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
        response:Response[];
        userId:string;
}
const copy = <T>(original:any):T => JSON.parse(JSON.stringify(original))
export {
        Count,
        SelectedOrder,
        OrderState,
        copy,
        Common,
}