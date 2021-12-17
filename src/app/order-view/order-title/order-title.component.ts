import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderTitle } from 'src/app/models/order-title.model';
import { initSelectedOrder } from '../store/order.action';
import { INITIAL_ORDER_TITLEL } from '../store/order.initial';
import * as OrderSelection from '../store/order.selector'
@Component({
  selector: 'order-title',
  templateUrl: './order-title.component.html',
  styleUrls: ['./order-title.component.css']
})
export class OrderTitleComponent implements OnInit {
  @Input() 
  public title : OrderTitle;
  public isSelected:Observable<string> = new Observable<string>(observer => observer.next(''));
  public isLoading:Observable<Boolean> = new Observable(observer => observer.next(false));
  constructor(private store:Store) {
    this.title = INITIAL_ORDER_TITLEL
   }

  ngOnInit(): void {
    this.isSelected = this.store
    .select(OrderSelection.getSelectedId())
    .pipe(
      map(id=> id==this.title.orderId),
      map(isSelected => isSelected ? 'selected':''),
    );
  }
  onClick(){
    this.isLoading = new Observable(observer => observer.next(true));
    this.store.dispatch(initSelectedOrder({id:this.title.orderId}))
  }
}
