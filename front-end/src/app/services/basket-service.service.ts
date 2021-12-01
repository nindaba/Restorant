import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import {Order} from '../models/order.model'
import {RestorantApis} from './restorant.apis';

@Injectable({
  providedIn: 'root'
}) 
export class BasketServiceService {
  private basketItems: (Item&{count:number})[]=[];
  constructor(private http:HttpClient) { 
  }
  remove(id: string) {
    this.basketItems.splice(this.basketItems.findIndex(item=> item.id===id),1)
  }
  add(item:Item){
    let index = this.basketItems.findIndex(findItem=> findItem.id===item.id);
    let update = this.basketItems[index];
    if(update){
      update.count++;
      this.basketItems[index] = update;
    }
    else this.basketItems.push({...item,count:1});
  }
  get items():(Item&{count:number})[]{
    return this.basketItems;
  }
  set items(items :(Item&{count:number})[]){
    this.basketItems = items;
  }
  get totalPrice():number{
    return this.basketItems
    .map(item=> item.count*item.price)
    .reduce((total,acc)=> acc+total,0);
  }
  //To be changed to order service
  sendOrder(){
    let orderTime:number = new Date().getTime();
    let orderItem: Order = {
      orderId:'',
      clientId:'',
      orderItems: this.basketItems.map(item=>{
        return {
          itemId:item.id,
          number:item.count,
          price:item.price
        }
      }),
      status: {
        accepted:false,
        cooking:false,
        ready:false,
        served:false,
        payed:false,
        cancelMessage:''
      },
      totalPrice:0, //this will be calculated by the server
      timeCreated:orderTime,
      timeUpdated:orderTime
    }
    this.http.post<HttpResponse<any>>(RestorantApis.ORDER,orderItem)
    .subscribe({
      next: value=> console.log("ORDER SENT "+value),
      error: error => console.log("ERROR "+error)
    })
  }
}
