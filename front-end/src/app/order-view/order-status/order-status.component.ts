import { Component, OnInit } from '@angular/core';
import { BasketServiceService } from 'src/app/services/basket-service.service';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {

  constructor(private basketService:BasketServiceService) { }

  ngOnInit(): void {
  }

  get totalPrice():number{
    return this.basketService.totalPrice;
  }
  get message():string{
    return '';
  }
  get status():number{
    return 0;
  }
  send(){
    this.basketService.sendOrder();
  }
}
