import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatus } from 'src/app/models/order-status.model';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import {sendOrder} from '../store/order.action' 
import { INITIAL_STATUS } from '../store/order.initial';
import { getStatus, getStatusIndex, getTotal, isBasket } from '../store/order.selector';
@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit,OnDestroy {
  totalPrice: Observable<number> = new Observable();
  isBasket: Observable<Boolean> = new Observable();
  subscription: Subscription =new Subscription();
  index: number =0;
  status: OrderStatus = INITIAL_STATUS;
  constructor(private store:Store) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.totalPrice = this.store.select(getTotal());
    this.isBasket = this.store.select(isBasket()).pipe(map(c=>{
      console.log(c)
      return c;
    }));
    this.subscription.add(this.store.select(getStatusIndex()).pipe(map(c=>0)).subscribe(index => this.index = index));
    this.subscription.add(this.store.select(getStatus()).subscribe(status => this.status = status));
  }
  send(){
    this.store.dispatch(sendOrder());
  }
}
