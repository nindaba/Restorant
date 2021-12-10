import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BasketItem } from 'src/app/models/basket-item.model';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { ItemService } from 'src/app/services/item-service.service';
import { OrderService } from 'src/app/services/order.service';
import { BasketServiceService } from '../../services/basket-service.service';
import { SelectedOrder } from '../store/order.model';
import { getSelected } from '../store/order.selector';

@Component({
  selector: 'order-display',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public order: Observable<SelectedOrder> = new Observable();
  constructor(
    private basketService : BasketServiceService,
    private orderService : OrderService,
    private itemService: ItemService,
    private store:Store,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params=>this.setItems(params['orderId']));
    this.order = this.store.select(getSelected());
  }
}
