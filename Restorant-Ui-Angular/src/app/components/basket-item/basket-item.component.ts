import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { BasketServiceService } from 'src/app/services/basket-service.service';

@Component({
  selector: 'basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {
  @Input() item: Item&{count:number};
  constructor(private basketService:BasketServiceService) { 
    this.item = {
      id: '',
      name: '',
      image: '',
      description: '',
      category:'',
      price: 0,
      count:0
    }
  }

  ngOnInit(): void {
    
  }
  remove(){
    this.basketService.remove(this.item.id);
  }
}
