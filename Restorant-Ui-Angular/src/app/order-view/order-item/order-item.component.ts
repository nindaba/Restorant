import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item.model';
import { INITIAL_ORDER_ITEM } from '../store/order.initial';
import { Count } from '../store/order.model';
import {increaseItems,decreaseItems} from '../store/order.action'
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item: Item&Count = INITIAL_ORDER_ITEM;
  @Input() index:number = -1;
  constructor(private store:Store,private userService:UserService){}
  ngOnInit(): void {
    
  }
  countAdd(){
    this.store.dispatch(increaseItems({index:this.index}))
  }
  countSub(){
    this.store.dispatch(decreaseItems({index:this.index}))
  }
  get isClient():Boolean{
    return !this.userService.isEmployee;
  }

}
