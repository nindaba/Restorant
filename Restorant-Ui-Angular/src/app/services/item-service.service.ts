import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { RestorantApis } from './restorant.apis';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  delete() {
    if(this.selected) this.http.delete(RestorantApis.ITEM_UPDATE(this.selected.id))
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  private _selected:Item|undefined//{id:'',name:'',description:'',price:0.0,image:'',category:''};
  constructor(private http:HttpClient,private router:Router) { }
  /**
   * @param ItemId 
   * @returns Item from the Item-service api
   */
  getItem(itemId:string):Item|undefined{
    let item:Item|undefined;
    this.http.get<Item>((itemId))
    .subscribe({
      next : response => item = response,
      //TODO: error Item not found or server not avilable errors to be handled
      error: errorResponse => console.log(errorResponse)
    });
    return item; //TODO: I am gooing to give scaffording data but will change that laiter
  }
  saveItem(item:Item,image:File) :void{
    let form:FormData = new FormData();
    form.append('item',JSON.stringify(item));
    form.append('image',image);
    this.http
    .post<HttpResponse<any>>(RestorantApis.ITEM,form)
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  editItem(item:Item,image:File|undefined) :void{
    let form:FormData = new FormData();
    form.append('item',JSON.stringify(item));
    form.append('image',image ||'');
    this.http
    .put<HttpResponse<any>>(RestorantApis.ITEM_UPDATE(this.selected?.id||''),form)
    .subscribe({
      next: response => this.router.navigate(this.url),
      //TODO: error handler eg pop up
      error:response => console.log(response)
    })
  }
  set selected(value:Item|undefined){
    this._selected = value;
  }
  get selected():Item|undefined{
    return this._selected;
  }
  get url():string[]{
    return this.router.url.split('/').slice(1,4); // because the route starts with "/" this will make the first index ""
  }
}
