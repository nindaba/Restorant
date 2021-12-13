import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatus } from 'src/app/models/order-status.model';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import {addResponse, sendOrder, setBasket} from '../store/order.action' 
import { INITIAL_STATUS } from '../store/order.initial';
import { Caller,Response } from 'src/app/models/response.module';
import { getResponse, getStatus, getStatusIndex, getTotal, isBasket } from '../store/order.selector';
@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit,OnDestroy {
  totalPrice: Observable<number> = new Observable();
  isBasket: Observable<Boolean> = new Observable();
  response: Observable<Response|undefined> = new Observable(observer=>{
    observer.next({
      message:'INITIAL',
      success:true,
      from:Caller.SEND_ORDER
    })
  });
  subscription: Subscription =new Subscription();
  index: number =0;
  status: OrderStatus = INITIAL_STATUS;
  constructor(private store:Store) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.totalPrice = this.store.select(getTotal());
    this.isBasket = this.store.select(isBasket());
    this.subscription.add(this.store.select(getStatusIndex()).subscribe(index => this.index = index));
    this.subscription.add(this.store.select(getStatus()).subscribe(status => this.status = status));
  }
  send(){
    this.response = this.store.select(getResponse(Caller.SEND_ORDER));
    this.store.dispatch(addResponse({response:{
      message: 'pending',
      success:false, //we dont know if it will be successful so
      from:Caller.SEND_ORDER
    }}))
    this.store.dispatch(setBasket({isBasket:false}));
    this.store.dispatch(sendOrder());
  }
}
