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
      padding: 0 0 0px 50px;
      height: calc(100vh - 64px);
      /* justify-content: space-around; */
      /* background-color: indigo; */
  }
  .order-list{
    flex: .25;
  }
  .order-display{
      flex: .69.5;
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
    if(this.service.order.isBasket) this.store.dispatch(OrderAction.setSelected({id:'INITIAL',order:copy(this.service.order)}));

  }
}
