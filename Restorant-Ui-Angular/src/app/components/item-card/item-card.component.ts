import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { ItemService } from 'src/app/services/item-service.service';

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
    private itemService:ItemService,
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
    return this.url.startsWith("/admin");
  }
  edit(){
    this.itemService.selected = this.item;
    this.router.navigate([this.url,'edit',this.item.id]);
  }
  get url() :string{
    return this.router.url;
  }
}
