import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryItem } from '../models/category-item.model';
import { Category } from '../models/category.model';
import { RestorantApis} from './restorant.apis';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  constructor(private http : HttpClient,private router:Router) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(RestorantApis.CATEGORY);
  }
  getCategoryItems(id:string){
    return this.http.get<CategoryItem>(RestorantApis.CATEGORY_ITEMS(id));
  }
  saveCategory(category :{data:string,image:string | ArrayBuffer}) :void{
    this.http
    .post<HttpResponse<any>>(RestorantApis.CATEGORY,category)
    .subscribe({
      next: response => {
        console.log(response)
        // this.router.navigate(['response.header.location.id'])
      },
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
}
