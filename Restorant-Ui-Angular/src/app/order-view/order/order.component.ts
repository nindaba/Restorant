import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable, of, Subscription, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { logger } from 'src/app/common/utils';
import { BasketItem } from 'src/app/models/basket-item.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { ItemService } from 'src/app/services/item-service.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { BasketServiceService } from '../../services/basket-service.service';
import { SelectedOrder } from '../store/order.model';
import * as OrderSelection from '../store/order.selector';
import * as OrderEmployeeSelection from '../../admin/store/order.selector';
import { initSelectedOrder,loadOrders } from 'src/app/admin/store/order.action';

@Component({
  selector: 'order-display',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
  public order: Observable<SelectedOrder> = new Observable();
  public noItem :Observable<Boolean> = new Observable(observer=> observer.next(true));
  public subScription: Subscription = new Subscription();
  constructor(
    private store:Store,
    private userService:UserService,private o:OrderService) { }
  ngOnDestroy(): void {
    this.subScription.unsubscribe();
  }
  
  ngOnInit(): void {
    if(this.userService.isEmployee){   
      this.store.dispatch(loadOrders());    
      this.store.dispatch(initSelectedOrder({id:'INITIAL'}))
      this.order = this.store.select(OrderEmployeeSelection.getSelected())
      this.noItem = this.store.select(OrderEmployeeSelection.noItem());
    }
    else{
      this.order = this.store.select(OrderSelection.getSelected());
      this.noItem = this.store.select(OrderSelection.noItem());
    }

  }
  
}
