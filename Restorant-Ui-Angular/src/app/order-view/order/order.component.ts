import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, merge, Observable, of, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { logger } from 'src/app/common-data/utils';
import { BasketItem } from 'src/app/models/basket-item.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { ItemService } from 'src/app/services/item-service.service';
import { OrderService } from 'src/app/services/order.service';
import { BasketServiceService } from '../../services/basket-service.service';
import { SelectedOrder } from '../store/order.model';
import * as OrderAction from '../store/order.selector';

@Component({
  selector: 'order-display',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public order: Observable<SelectedOrder> = new Observable();
  public noItem :Observable<Boolean> = new Observable(observer=> observer.next(false));
  constructor(
    private store:Store) { }

  ngOnInit(): void {
    this.order = this.store.select(OrderAction.getSelected());
    this.noItem = this.store.select(OrderAction.noItem());
  }
  
}
