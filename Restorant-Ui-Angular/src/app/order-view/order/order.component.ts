import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { OrderService } from 'src/app/services/order.service';
import { BasketServiceService } from '../../services/basket-service.service';

@Component({
  selector: 'order-display',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orderId :string ='';
  public Items: (Item&{count:number})[]=[];
  constructor(
    private basketService : BasketServiceService,
    private orderService : OrderService,
    private itemService: ItemServiceService,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.orderId = params['orderId'];
    })
  }
  /**
   * will first check if the client is trying to get an old order
   * or wants to buy new order
   * TODO: if both arrays are empty it shouls diplay that no order made yet
   * @returns Array of Item with number of those items
   */
  getItems():(Item&{count:number})[]{
      return this.orderId ?
      this.orderService
      .getOrder(this.orderId)?.orderItems
      .map((orderItem):(Item&{count:number})=>{
        let item = this.itemService.getItem(orderItem.itemId);
        return ({
          id:orderItem.itemId,
          name:item?.name||'',
          category:item?.category||'',
          image:item?.image||'',
          price:orderItem.price,
          count:orderItem.number,
          description:item?.description||''
        })
      })
      //Or if the order is not found in the order service
      //it should return an empty array
      || []:
      //else if the id is null it will check if the person is trying to buy
      //therefore it checks the basket
      this.basketService.items;
      
  }
}
