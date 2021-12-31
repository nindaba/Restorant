import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { RestorantApis } from '../common/restorant.apis';
import { UserService } from './user.service';
import { BasketItem } from '../models/basket-item.model';
import { Item } from '../models/item.model';
import { Count, SelectedOrder  } from '../order-view/store/order.model';
import { OrderStatus } from '../models/order-status.model';
import { INITIAL_STATUS } from '../order-view/store/order.initial';
import { copy } from '../common/utils';
import { OrderCount } from '../admin/store/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = []; //ORDERS  TODO: Emptie the orders once you connect to the spring services
  public onLoaded:EventEmitter<boolean> = new EventEmitter()
  constructor(
    private http:HttpClient,
    private userService:UserService) { 
  }
  /**
   * This will create on Observable using event source from reactive api of order-service
   * @param flag of checking if you want all the records or specifically for client
   * @returns Observable of Orders
   */
  loadOrders(all?:Boolean): Observable<Order>{
    let ordersEvent = new EventSourcePolyfill(all ? RestorantApis.ORDER_IN_PROCESS: RestorantApis.ORDER,{
      headers:{'Authorization': this.userService.token},
      heartbeatTimeout: 2*60*60*1000 //2 hours
    });
    return new Observable<Order>(
      observer=>{
        ordersEvent.onmessage = order => observer.next(JSON.parse(order.data));
        return ()=> ordersEvent.close();
      }
    );
  }
  /**
   * @param order we transform the order into an order of order server format and we give it
   * Time it was created
   * @returns HttpResponse
   */
  sendOrder(order: SelectedOrder): Observable<HttpResponse<any>> {
    return this.http.post<any>(RestorantApis.ORDER,{
      ...order,
      id: null,
      orderItems: order.items
      .map((item:Item&Count):BasketItem => ({
        itemId: item.id,
        number: item.count,
        price: item.price
      })),
      status: INITIAL_STATUS,
      username: this.userService.username,
      timeCreated: new Date().getTime(),
      timeUpdated: new Date().getTime(),
    },{observe:'response'});
  }
  update(_order: SelectedOrder,status:OrderStatus): Observable<any> {
    let order: SelectedOrder = copy(_order);
    order.status = status;
    return this.http.put<any>(RestorantApis.ORDER,order);
  }

  loadOrderCounter():Observable<OrderCount>{
    let orderCountEvent = new EventSourcePolyfill(RestorantApis.ORDER_COUNTER,{
      headers:{'Authorization': this.userService.token},
      heartbeatTimeout: 2*60*60*1000 //2 hours
    });
    return new Observable<OrderCount>(observer =>{      
      orderCountEvent.onmessage = event => observer.next(JSON.parse(event.data));
      return ()=> orderCountEvent.close();
    });
  }
}

