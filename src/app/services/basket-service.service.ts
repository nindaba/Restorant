import { Injectable } from '@angular/core';
import { copy } from '../common/utils';
import { Item } from '../models/item.model';
import { INITIAL_SELECTED_ORDER } from '../order-view/store/order.initial';
import { Count, SelectedOrder } from '../order-view/store/order.model';

@Injectable({
  providedIn: 'root'
}) 
export class BasketServiceService {
  private basketItems: (Item&{count:number})[]=[];
  constructor() {}
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
  get items():(Item&Count)[]{
    return this.basketItems;
  }
  set items(items :(Item&Count)[]){
    this.basketItems = items;
  }
  get totalPrice():number{
    return this.basketItems
    .map(item=> item.count*item.price)
    .reduce((total,acc)=> acc+total,0);
  }
  get order():SelectedOrder{
    let order:SelectedOrder = copy(INITIAL_SELECTED_ORDER);
    order.items = this.basketItems; // copy because i dont want it to create a cooection with the state which will make it read only
    if(order.items.length > 0) order.isBasket = true;
    return order;
  }
}
