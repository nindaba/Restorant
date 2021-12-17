import { Component, OnInit,Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-item-skeleton',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemSkeletonComponent implements OnInit {
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    // this.item.
  }
}
