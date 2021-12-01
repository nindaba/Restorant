import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private http:HttpClient) { }
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
}
