import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item.model';
import { OrderService } from 'src/app/services/order.service';
import { INITIAL_ORDER_ITEM } from '../store/order.initial';
import { copy, Count } from '../store/order.model';
import {increaseItems,decreaseItems} from '../store/order.action'
@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item: Item&Count = INITIAL_ORDER_ITEM;
  @Input() index:number = -1;
  constructor(private store:Store){}
  ngOnInit(): void {
    
  }
  countAdd(){
    this.store.dispatch(increaseItems({index:this.index}))
  }
  countSub(){
    this.store.dispatch(decreaseItems({index:this.index}))
  }
}
