import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { OrderService } from 'src/app/services/order.service';
import * as OrderAction from '../store/order.action';
import { INITIAL_ORDER, INITIAL_SELECTED_ORDER, INITIAL_STATUS } from '../store/order.initial';
import { copy, SelectedOrder } from '../store/order.model';
import { getOrder, getOrders, getSelected } from '../store/order.selector';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit ,OnDestroy{
  constructor(private store:Store,private service:BasketServiceService) { }

  ngOnInit(): void {
    // this.store.dispatch(OrderAction.onError({message:'doubl'}))
    this.store.dispatch(OrderAction.loadOrders())
    if(this.service.order.isBasket) this.store.dispatch(OrderAction.setSelected({order:copy(this.service.order)}));
    else this.store.dispatch(OrderAction.initSelectedOrder({index:7}));
  }
  ngOnDestroy():void{
  }
}
