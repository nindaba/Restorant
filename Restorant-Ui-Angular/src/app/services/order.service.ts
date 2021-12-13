import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { RestorantApis } from '../common-data/restorant.apis';
import { UserService } from './user.service';
import { BasketItem } from '../models/basket-item.model';
import { Item } from '../models/item.model';
import { Count, SelectedOrder } from '../order-view/store/order.model';
import { logger } from '../common-data/utils';
import { map } from 'rxjs/operators';
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
   * @returns Observable of Orders
   */
  loadOrders(): Observable<Order>{
    let ordersEvent = new EventSourcePolyfill(RestorantApis.ORDER,{
      headers:{'Authorization': "bearer "+this.userService.token},
      heartbeatTimeout: 2*60*60*1000 //2 hours
    });
    return new Observable<Order>(
      subscriber=>{
        ordersEvent.onmessage = order => subscriber.next(JSON.parse(order.data));
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
    return this.http.post<HttpResponse<any>>(RestorantApis.ORDER,{
      ...order,
      id: null,
      orderItems: order.items
      .map((item:Item&Count):BasketItem => ({
        itemId: item.id,
        number: item.count,
        price: item.price
      })),
      timeCreated: new Date().getTime(),
      timeUpdated: new Date().getTime(),
    });
  }
}

