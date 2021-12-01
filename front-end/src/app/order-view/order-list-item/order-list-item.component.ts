import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderTitle } from 'src/app/models/order-title.model';

@Component({
  selector: 'order-list-item',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.css']
})
export class OrderListItemComponent implements OnInit {
  @Input() 
  public title : OrderTitle;
  constructor(private router:Router) {
    this.title = {
      orderId: '',
      date:'',
      time:'',
      totalPrice : 0,
      status:''
    }
   }

  ngOnInit(): void {
  }
  onClick(){
    this.router.navigate(['orders',this.title.orderId])
  }
}
