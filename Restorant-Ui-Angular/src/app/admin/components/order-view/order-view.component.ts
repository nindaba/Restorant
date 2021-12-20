import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadOrders } from '../../store/order.action';
import { OrderTitle } from '../../store/order.model';
import { getTitles } from '../../store/order.selector';

@Component({
  selector: 'app-order-view',
  template: `
  <div class="content" fxLayout="row wrap">
    <div class="orders"  *ngFor="let title of titles|async">
        <order-request [title]="title"></order-request>
    </div>
  </div>
  `,
  styles:[`
  .content{
      height: 100%;
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
