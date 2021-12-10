import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderTitle } from 'src/app/models/order-title.model';
import { INITIAL_ORDER_TITLEL } from '../store/order.initial';

@Component({
  selector: 'order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {
  @Input() 
  public title : OrderTitle;
  constructor(private router:Router) {
    this.title = INITIAL_ORDER_TITLEL
   }

  ngOnInit(): void {
  }
  onClick(){
    this.router.navigate(['orders',this.title.orderId])
  }
}
