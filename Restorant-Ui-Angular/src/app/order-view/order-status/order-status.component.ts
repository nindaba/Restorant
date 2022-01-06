import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OrderStatus } from 'src/app/models/order-status.model';
import {addResponse, sendOrder, setBasket} from 'src/app/order-view/store/order.action' 
import { INITIAL_STATUS } from '../store/order.initial';
import { Caller,Response } from 'src/app/models/response.module';
import * as ClientSelect from '../store/order.selector';
import { UserService } from 'src/app/services/user.service';
import { updateStatus } from 'src/app/admin/store/order.action';
import *as EmployeeSelect from 'src/app/admin/store/order.selector';
import { newStatus } from 'src/app/common/order.common';
import { OrderService } from 'src/app/services/order.service';
import { BasketServiceService } from 'src/app/services/basket-service.service';
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
  @Input() cancelMessage:string =''
  constructor(
    private store:Store,
    private userService:UserService,
    private basketService:BasketServiceService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    
    this.isBasket = this.store.select(ClientSelect.isBasket());
    if(this.isEmployee){
      this.totalPrice = this.store.select(EmployeeSelect.getTotal());
      this.subscription
      .add(this.store.select(EmployeeSelect.getStatusIndex()).subscribe(index => this.index = index))
      .add(this.store.select(EmployeeSelect.getStatus()).subscribe(status => this.status = status));
    }
    else{
      this.totalPrice = this.store.select(ClientSelect.getTotal());
      this.subscription
      .add(this.store.select(ClientSelect.getStatusIndex()).subscribe(index => this.index = index))
      .add(this.store.select(ClientSelect.getStatus()).subscribe(status => this.status = status));
    }
  }
  send(){
    this.response = this.store.select(ClientSelect.getResponse(Caller.SEND_ORDER));
    this.store.dispatch(addResponse({response:{
      message: 'pending',
      success:false, //we dont know if it will be successful so
      from:Caller.SEND_ORDER
    }}));
    this.store.dispatch(setBasket({isBasket:false}));
    this.store.dispatch(sendOrder());
    this.userService.onMenu();
    this.basketService.clearBasket();
  }
  get isEmployee():Boolean{
    return this.userService.isEmployee;
  }
  cancel(){
    this.response = this.store.select(EmployeeSelect.getResponse(Caller.SEND_ORDER));
    this.store.dispatch(addResponse({response:{
      message: 'pending',
      success:false, //we dont know if it will be successful so
      from:Caller.SEND_ORDER
    }}))
    this.store.dispatch(updateStatus({
      status: newStatus(this.status,this.cancelMessage)
    }));
    this.cancelMessage=''
  }
  updateOrder(index:number){
    this.store.dispatch(updateStatus({status: newStatus(this.status,index)}));
  }
}
