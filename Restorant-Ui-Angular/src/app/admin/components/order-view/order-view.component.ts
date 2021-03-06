import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { loadOrders } from '../../store/order.action';
import { OrderTitle } from '../../store/order.model';
import { getTitles } from '../../store/order.selector';

@Component({
  selector: 'app-order-view',
  template: `
  <div class="content">
    <fx-header>
      <h2 left>Orders</h2>
      <custom-input [(ngModel)]="search"
        [properties] = "{name:'Search',hasTitle:false,icon:'search'}"
      ></custom-input>
    </fx-header>
    <div class="orders">
        <order-request  *ngFor="let title of titles|async" [title]="title"></order-request>
    </div>
  </div>
  `,
  styles:[`
  .orders{
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media(max-width: 768px){
    .orders{
      margin-left: .5em;
    }
  }
  `]
})
export class OrderViewComponent implements OnInit {
  search:String = '';
  _titles:Observable<OrderTitle[]> = new Observable();
  constructor(private store:Store) { }
  ngOnInit(): void {
    this.store.dispatch(loadOrders());
    this._titles = this.store.select(getTitles());
  }
  get titles():Observable<OrderTitle[]>{
    return this._titles.pipe(map(orders=> orders
      .filter(order=> (order.username+order.status)
        .toLocaleLowerCase()
        .search(this.search.toLocaleLowerCase()) > -1)
      )
    )
  }
}
