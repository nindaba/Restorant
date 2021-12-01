import { Component, OnInit,Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item: (Item&{count:number})|any;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    // this.item.
  }
  countAdd(){
    this.item.count++;
  }
  countSub(){
    if(this.item.count> 0) this.item.count--;
  }
  //while seending remove the items with count 0
}
