import { Component, OnInit,Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-list-skeleton',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListSkeletonComponent implements OnInit {
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    // this.item.
  }
}
