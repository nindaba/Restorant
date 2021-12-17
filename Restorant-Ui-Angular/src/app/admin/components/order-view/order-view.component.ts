import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { loadOrders } from '../../store/order.action';
import { OrderTitle } from '../../store/order.model';
import { getOrders, getTitles } from '../../store/order.selector';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  titles:Observable<OrderTitle[]> = new Observable();
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadOrders());
    this.titles = this.store.select(getTitles());
  }

}
