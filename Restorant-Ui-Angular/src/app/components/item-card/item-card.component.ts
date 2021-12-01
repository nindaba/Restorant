import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { BasketServiceService } from 'src/app/services/basket-service.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  @Input('item') item:Item;
  constructor(
    private router:Router,
    private basketService:BasketServiceService,
    private snack: MatSnackBar) {
    this.item = {
      id: '',
      name: '',
      image: '',
      description: '',
      category:'',
      price: 0
    }
  }

  ngOnInit(): void {
  }
  addToCart(){
    this.basketService.add(this.item);
    this.snack.open(`Item ${this.item.name} was added to Cart`,'X',{duration:3000});
  }
  get isAdmin():Boolean{
    return this.router.url.startsWith("/admin");
  }
}
