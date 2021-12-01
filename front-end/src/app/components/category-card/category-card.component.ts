import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input('category') category : Category;
  @Output('viewItems')
  viewItemsEvent: EventEmitter<string>;
  constructor(private router:Router) {
    this.category = {
      id: '',
      name: '',
      image: '',
      description: '',
      items: []
    }
    this.viewItemsEvent = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }
  viewItems(){
    this.router.navigate(['category',this.category.id]);
  }
  get isAdmin():Boolean{
    return this.router.url.startsWith("/admin");
  }
}
