import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { EventSourcePolyfill } from 'ng-event-source';
import { Observable, Subscription } from 'rxjs';
import { OrderStatus } from '../models/order-status.model';
import { OrderTitle } from '../models/order-title.model';
import { Order } from '../models/order.model';
import { ORDERS } from '../order-view/scaffording.data';
import { RestorantApis } from '../common-data/restorant.apis';
import { UserService } from './user.service';
import { InitialModels } from '../common-data/initial-models.data';
import { BasketItem } from '../models/basket-item.model';
import { ItemService } from './item-service.service';
import { Item } from '../models/item.model';
import { Store } from '@ngrx/store';
import * as OrderSelector from '../order-view/store/order.selector';
import { map, take } from 'rxjs/operators';
import { Count, SelectedOrder } from '../order-view/store/order.model';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  sendOrder(order: SelectedOrder): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(RestorantApis.ORDER,order);
  }
  private orders: Order[] = []; //ORDERS  TODO: Emptie the orders once you connect to the spring services
  public onLoaded:EventEmitter<boolean> = new EventEmitter()
  constructor(
    private http:HttpClient,
    private userService:UserService,
    private itemService:ItemService,
    private store:Store) { 
  }
  /**
   * TODO: have to test it with real api
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
   * this will search through the orders and see if the order with an id is present
   * @param orderId is not null @returns Order
   * orderId has no item or it is null @returns Order the first order
   * if there is no order it will @returns undefined
   */
  getOrder(orderId:string):Order{ 
    return orderId ? 
    //Get the order with matching Id
    this.orders.find(order => order.orderId == orderId)? 
    //if not found sort and get the latest order 
    this.orders.sort(this.compare)[0] :
    //if no orderId get the latest order or undefined
    this.orders.sort(this.compare)[0] : InitialModels.ORDER
  }
  getLatestItems() :(Item&{count:number})[]{
    let latest = this.orders
    .sort(this.compare)
    .slice(0,1)
    .map(order=> order
      .orderItems
      
      .map(item => this.transformItem(item))
      );
    return Array.prototype.concat( ...latest);
  }
  getLatestItem(orderId:string) :(Item&{count:number})[]{
    return this.getOrder(orderId)
    .orderItems
    .map(item => this.transformItem(item));
  }
  /**
   * this will convert back the BasketItem of ItemId, price and coutnt to full item and count
   * by fetching the data of the item using the Item id
   * but we keep the price the item was bought on and the count
   * @param orderItem 
   * @returns Item&{count:number}
   */
  transformItem(orderItem:BasketItem):Item&Count{
    let item = this.itemService.getItem(orderItem.itemId);
    return {
      id: orderItem.itemId,
      name: item.name,
      category: item.category,
      image: item.image,
      price: orderItem.price,
      count: orderItem.number,
      description: item.description
    }
  }
  compare = (a:any,b:any)=> a.timeUpdated-b.timeUpdated;
}

