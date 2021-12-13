import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import * as OrderAction from '../store/order.action';
import { copy } from '../store/order.model';
import { isEmpty } from '../store/order.selector';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit{
  constructor(private store:Store,private service:BasketServiceService) { }
  isEmpty:Observable<Boolean> = new Observable(observaber=> observaber.next(true));
  ngOnInit(): void {
    this.isEmpty = this.store.select(isEmpty());
    this.store.dispatch(OrderAction.loadOrders())
    if(this.service.order.isBasket) this.store.dispatch(OrderAction.setSelected({id:'',order:copy(this.service.order)}));
  }
}
