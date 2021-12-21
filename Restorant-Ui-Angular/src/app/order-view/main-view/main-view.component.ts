import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { copy } from 'src/app/common/utils';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import * as OrderAction from '../store/order.action';
import { isEmpty } from '../store/order.selector';

@Component({
  selector: 'app-main-view',
  template:`
    <div class="content">
      <div class="order-list">
          <order-list *ngIf="!(isEmpty|async)"></order-list>
          <order-list-skeleton *ngIf="isEmpty|async"></order-list-skeleton>
      </div>
      <div class="order-display">
          <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles:[`
  .content{
      display: flex;
      flex-direction: row;
      padding: 0 50px 0px 50px;
      height: 100%;
      width: 90%;
      /* background-color: indigo; */
  }
  .order-list{
      width: 25%;
  }
  .order-display{
      width: 70%;
      /* background-color: green; */
  }`]
})
export class MainViewComponent implements OnInit{
  constructor(private store:Store,private service:BasketServiceService) { }
  isEmpty:Observable<Boolean> = new Observable(observaber=> observaber.next(true));
  ngOnInit(): void {
    this.store.dispatch(OrderAction.isUserChanged())
    this.isEmpty = this.store.select(isEmpty());
    this.store.dispatch(OrderAction.loadOrders());
    if(this.service.order.isBasket) this.store.dispatch(OrderAction.setSelected({id:'',order:copy(this.service.order)}));

  }
}
