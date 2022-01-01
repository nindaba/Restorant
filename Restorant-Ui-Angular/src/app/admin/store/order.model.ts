import { BasketItem } from "src/app/models/basket-item.model";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import { Caller,Response } from "src/app/models/response.module";
enum Common {
        FREATUE_ORDER_KEY = '[employee_order] order_store',
        LOAD_ORDERS = '[employee_order] load_orders',
        ORDERS_LOADED_SUCCESS = '[employee_order] orders_loaded_success',
        INIT_TITLES = '[employee_order] init_titles',
        INIT_ITEMS = "[employee_order] init_items",
        SET_SELECTED = "[employee_order] set_selected",
        INIT_SELECTED_ORDER = '[employee_order] init_seleceted_order',
        LOAD_SELECTED_ITEMS = '[employee_order] load_selected_items',
        INCREASE_ITEMS = "[employee_order] increase_items",
        DECREASE_ITEMS = "[employee_order] decrease_items",
        SEND_ORDER = '[employee_order] send_order',
        ORDER_SEND_SUCCESS = '[employee_order] order_send_success',
        SELECT_SUCCESS = "[employee_order] select_success",
        ON_ERROR = "[employee_order] on_error",
        DOUBLE = "[employee_order] learning_double_actions",
        ON_RESPONSE = "[employee_order] on_response",
        SET_BASKET = "[employee_order] set_is_basket",
        CHECH_USER = "[employee_order] check_user",
        USER_CHANGED = "[employee_order] on_user_changed",
        UPDATE_ORDER = "ipdate_order",
        ORDER_UPDATE_SUCCESS = "order_update_success",


        //Performance 
        FREATUE_PERFORMANCE_KEY = "[performance] performance_store",
        LOAD_PERFORMANCE = '[performance] load_performance',
        ORDER_COUNTER_LOADED = '[performance] order_counter_loaded',
        MOST_SOLD_LOADED = "[performance] most_sold_loaded"
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
        //performance
}
interface OrderTitle{
        status :string,
        time :string,
        orderId : string,
        username:string,
        clientId: string,
        count: number,
        totalPrice :number,
    }
interface OrderCount{
        status:string;
        count :number;
        totalAmount:number;
        totalItems:number;
}

interface PerformanceState{
        mostSoldItems: BasketItem[];
        orderCounter: OrderCount[];
}
interface NameValue{
        name:string;
        value:number
}
export {
        Count,
        SelectedOrder,
        OrderState,
        Common,
        OrderTitle,
        OrderCount,
        
        //Performance Modules
        PerformanceState,
        NameValue,
}