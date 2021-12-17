import { Item } from "src/app/models/item.model";
import { OrderTitle } from "src/app/models/order-title.model";
import { Order } from "src/app/models/order.model";
import { Caller,Response } from "src/app/models/response.module";
enum Common {
        FREATUE_KEY = '[client_order] order_store',
        LOAD_ORDERS = '[client_order] load_orders',
        ORDERS_LOADED_SUCCESS = '[client_order] orders_loaded_success',
        INIT_TITLES = '[client_order] init_titles',
        INIT_ITEMS = "[client_order] init_items",
        SET_SELECTED = "[client_order] set_selected",
        INIT_SELECTED_ORDER = '[client_order] init_seleceted_order',
        LOAD_SELECTED_ITEMS = '[client_order] load_selected_items',
        INCREASE_ITEMS = "[client_order] increase_items",
        DECREASE_ITEMS = "[client_order] decrease_items",
        SEND_ORDER = '[client_order] send_order',
        ORDER_SEND_SUCCESS = '[client_order] order_send_success',
        SELECT_SUCCESS = "[client_order] select_success",
        ON_ERROR = "[client_order] on_error",
        DOUBLE = "[client_order] learning_double_actions",
        ON_RESPONSE = "[client_order] on_response",
        SET_BASKET = "[client_order] set_is_basket",
        CHECH_USER = "[client_order] check_user",
        USER_CHANGED = "[client_order] on_user_changed"
}
interface Count{
        count:number;
}
interface SelectedOrder extends Order{
        items: (Item&Count)[] ;
        isBasket:Boolean;
}
interface OrderState{
        orders: Order[] ;
        titles:OrderTitle[] ;
        selectedOrder: SelectedOrder;
        selectedIndex:number;
        isEmpty: Boolean;
        response:Response[] ;
        userId:string;
}

export {
        Count,
        SelectedOrder,
        OrderState,
        Common,
}