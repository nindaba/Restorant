import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InitialModels } from 'src/app/common-data/initial-models.data';
import { RestorantApis } from 'src/app/common-data/restorant.apis';
import { CategoryItem } from 'src/app/models/category-item.model';
import { Category } from 'src/app/models/category.model';
import { Item } from 'src/app/models/item.model';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit,OnDestroy {

  categories: Category[];
  categoriesDisplay: Category[];
  subscription: Subscription;
  _search:string='';
  @Input('search')
  set search(search:any){
    this.categoriesDisplay = this.categories.filter(category=> category.name.includes(search));
    this._search = search;
  }
  get search():any{
    return this._search;
  }
  //the selected category
  categoryItem: CategoryItem;
  padding:string = 'pd-category';
  constructor(
    private categoryService: CategoryService,
    private activatedRoutes:ActivatedRoute,
    private http:HttpClient,
    private router:Router) {
    this.categories = []
    this.categoryItem = InitialModels.CATEGORY_ITEM;
    this.categoriesDisplay = [];
    this.subscription = new Subscription();
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
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

    this.http.get("http://localhost:5001/1",{observe: 'response'}).subscribe(c=> console.log(c.headers.keys())); 

  }
  get isLoading():Boolean{
    //checks if the categories length == 0 has values
    return this.categories.length == 0 
  }
  get isAdmin():Boolean{
    return this.router.url.startsWith("/admin");
  }
}
