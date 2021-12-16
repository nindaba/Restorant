import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { OrderTitle } from 'src/app/models/order-title.model';
import { OrderService } from 'src/app/services/order.service';
import { initSelectedOrder } from '../store/order.action';
import { getTitles } from '../store/order.selector';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  titles: Observable<OrderTitle[]> = new Observable();

  constructor(private store:Store) { }
  ngOnInit(): void {
    this.titles = this.store.select(getTitles());
    this.store.dispatch(initSelectedOrder({id:'INITIAL'}));
  }

}
