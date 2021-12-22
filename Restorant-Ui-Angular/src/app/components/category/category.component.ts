import { Component, HostListener, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InitialModels } from 'src/app/common/initial-models.data';
import { logger } from 'src/app/common/utils';
import { CategoryItem } from 'src/app/models/category-item.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {

  _categories: Category[] =[];
  subscription: Subscription;
  search:string='';
  //the selected category
  categoryItem: CategoryItem;
  padding:string = 'pd-category';
  constructor(
    private categoryService: CategoryService,
    private activatedRoutes:ActivatedRoute,
    private router:Router,
    private render:Renderer2,
    ) {
    this.categories = []
    this.categoryItem = InitialModels.CATEGORY_ITEM;
    this.subscription = new Subscription();
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // this.render.listen('window','scroll',ev=> logger(ev));
    // this.activateedRoutes.url.
    this.subscription.add(this.activatedRoutes
    .params
    .subscribe( (params:Params) =>{
      let categoryId = params.categoryId;
      //this is clean since it happens once

      // Subscribe to all categories
      this.subscription.add(categoryId ? this.categoryService
      .getCategoryItems(categoryId)
      .subscribe(categoryItem=>this.categoryItem = categoryItem)
      // or Subscribe to category Item
      : this.categoryService
      .getCategories()
      .subscribe(categories=> this.categories = categories) 
      )
    }));
  }
  get isLoading():Boolean{
    //checks if the categories length == 0 has values
    return this.categories.length == 0 
  }
  get isAdmin():Boolean{
    return this.router.url.startsWith("/admin");
  }
  set categories(categories:Category[]){
    this._categories = categories;
  }
  get categories():Category[]{
    return this._categories.filter(category => (category.name+category.description)
      .toLocaleLowerCase().search(this.search.toLocaleLowerCase()) > -1);
  }
  // @Listener onScroll():void{
  //   logger("scrolling")
  // }
}
