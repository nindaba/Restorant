import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadOrders } from '../../store/order.action';
import { OrderTitle } from '../../store/order.model';
import { getTitles } from '../../store/order.selector';

@Component({
  selector: 'app-order-view',
  template: `
  <div class="content">
    <fx-header>
      <h2 right>Orders</h2>
    </fx-header>
    <div class="orders" fxLayout="row wrap" fxLayoutAlign="start start">
        <order-request  *ngFor="let title of titles|async" [title]="title"></order-request>
    </div>
  </div>
  `,
  styles:[`
  .content{
      height: 90%;
  }
  .orders{
    height:100%;
    overflow-y:auto;
  }
  `]
})
export class OrderViewComponent implements OnInit {
  titles:Observable<OrderTitle[]> = new Observable();
  constructor(private store:Store) { }
  ngOnInit(): void {
    this.store.dispatch(loadOrders());
    this.titles = this.store.select(getTitles());
  }
}
