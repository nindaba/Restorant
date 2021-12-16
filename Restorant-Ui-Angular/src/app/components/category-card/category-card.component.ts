import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input('category') category : Category;
  @Output('viewItems')
  viewItemsEvent: EventEmitter<string>;
  constructor(private router:Router,private service:CategoryService) {
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
  get isAdmin():Boolean{
    return this.url.startsWith("/admin");
  }
  edit(){
    this.service.selected = this.category;
    this.router.navigate([this.url,'edit',this.category.id]);
  }
  /**
   * @returns current url
   */
  get url():string{
    return this.router.url;
  }
  viewItems():void{
    this.service.selected = this.category;
    this.router.navigate([this.url,this.category.id]);
  }
}
