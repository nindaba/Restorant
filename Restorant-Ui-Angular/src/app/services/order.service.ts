import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderStatus } from '../models/order-status.model';
import { OrderTitle } from '../models/order-title.model';
import { Order } from '../models/order.model';
import { ORDERS } from '../order-view/scaffording.data';
import { RestorantApis } from './restorant.apis';
@Injectable({
  providedIn: 'root'
})
//TODO: implement the observable to update orders
export class OrderService {
  private orders: Order[] = ORDERS //[]; TODO: Emptie the orders once you connect to the spring services
  constructor(private http:HttpClient) { 
  }
  /**
   * TODO: have to test it with real api
   * This will create on Observable using event source from reactive api of order-service
   * @returns Observable of Orders
   */
  loadOrders(): Observable<Order>{
    let ordersEvent = new EventSource(RestorantApis.ORDER);
    return new Observable<Order>(
      subscriber=>{
        ordersEvent.addEventListener(
          'message',
          event => subscriber.next(JSON.parse(event.data))
        );
        return ()=> ordersEvent.close();
      }
    )
  }
  updateOrder(order: Order){
    

  }
  /**
   * @returns Array of Orders
   */
  getOrders():Order[]{
    return this.orders;
  }
  /**
   * this will search through the orders and see if the order with an id is present
   * @param orderId is not null @returns Order
   * orderId has no item or it is null @returns Order the first order
   * if there is no order it will @returns undefined
   */
  getOrder(orderId:string):Order|undefined{ 
    return orderId ? 
    //Get the order with matching Id
    this.orders.find(order => order.orderId == orderId)? 
    //if not found sort and get the latest order 
    this.orders.sort((a,b)=> a.timeUpdated >= b.timeUpdated ? 1:0)[0] :
    //if no orderId get the latest order or undefined
    this.orders.sort((a,b)=> a.timeUpdated >= b.timeUpdated ? 1:0)[0] : undefined
  }
  /**
   * This will change the Orders into an object of OrderTitle
   * by extacting the orderId,status,time it was created and totalPrice
   * Note that the time is the time of update
   * @returns Array of OrderTitle
   */
  getTitles():OrderTitle[]{
    return this.orders
    .map(order=> ({
      status :this.extractLatestStatus(order.status),
      date :this.extractTimestamp(order.timeCreated).date,
      time :this.extractTimestamp(order.timeUpdated).time,
      orderId : order.orderId,
      totalPrice :order.totalPrice
    }));
  }
  /**
   * This takes in timestamp and converts it to JS Date,
   * remove the seconds part of the date 
   * splits the date and time
   * @param timestamp 
   * @returns Object of {date:string,time:string}
   */
  extractTimestamp(timestamp:number):{date:string,time:string}{
    let dateTime : {date:string,time:string} = {date:'',time:''};
    [dateTime.date,dateTime.time] = new Date(timestamp)
    .toISOString()
    .substr(0,16)
    .split("T");
    return dateTime;
  }

  /**
   * @param OrderStatus
   * This follows the order of essential status and checks which one is true first,
   * if the last is true and the first is true: of couse it will return the first
   * The Order is as follow and it will return one if true
   * 
   * 0. cancelled
   * 1. payed
   * 2. served
   * 3. ready
   * 4. cooking 
   * 5. accepted
   * 6. New Order
   * 
   * @returns String of status
  */
  extractLatestStatus(status:OrderStatus):string{
    return status.cancelMessage ? "canceled":
            status.payed ? "Payed": 
            status.served ? "Served":
            status.ready ? "Ready":
            status.cooking ? "Cooking":
            status.accepted ? "Accepted":
            "New Order";
  }
}

