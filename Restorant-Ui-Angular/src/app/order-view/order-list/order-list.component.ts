import { Component, Input, OnInit } from '@angular/core';
import { OrderTitle } from 'src/app/models/order-title.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() titles: OrderTitle[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
