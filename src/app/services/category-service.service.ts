import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryItem } from '../models/category-item.model';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';
import { Order } from '../models/order.model';
import { RestorantApis} from '../common/restorant.apis';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  delete() {
    if(this.selected) this.http.delete(RestorantApis.CATEGORY_UPDATE(this.selected.id))
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  private _selected :Category|undefined;
  constructor(private http : HttpClient,private router:Router) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(RestorantApis.CATEGORY);
  }
  getCategory(id:string): Observable<Category>{
    return this.http.get<Category>(RestorantApis.CATEGORY+'/'+id);
  }
  getCategoryItems(id:string){
    return this.http.get<CategoryItem>(RestorantApis.CATEGORY_ITEMS(id));
  }
  saveCategory(category:Category,image:File) :void{
    let form:FormData = new FormData();
    form.append('category',JSON.stringify(category));
    form.append('image',image);
    this.http
    .post<HttpResponse<any>>(RestorantApis.CATEGORY,form)
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  editCategory(category:Category,image:File) :void{
    let form:FormData = new FormData();
    form.append('category',JSON.stringify(category));
    form.append('image',image);
    this.http
    .put<HttpResponse<any>>(RestorantApis.CATEGORY_UPDATE(this.selected?.id||''),form)
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  set selected(value:Category|undefined){
    this._selected = value;
  }
  get selected():Category|undefined{
    return this._selected;
  }
  get url():string[]{
    return this.router.url.split('/').slice(1,3);
  }
}
