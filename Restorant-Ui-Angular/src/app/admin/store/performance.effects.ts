import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { merge, zip } from "rxjs";
import { map, mergeAll, mergeMap, retry } from "rxjs/operators";
import { BasketItem } from "src/app/models/basket-item.model";
import { ItemService } from "src/app/services/item.service";
import { OrderService } from "src/app/services/order.service";
import {  loadPerformance, mostSoldLoaded, orderCounterLoaded } from './order.action'
@Injectable()
export class PerformanceEffects{
    constructor(private actions:Actions,private orderService:OrderService,private itemService:ItemService){
    }
    onLoadPerformance= createEffect(()=> this.actions.pipe(
        ofType(loadPerformance),
        mergeMap(()=> merge(
                this.orderService.loadOrderCounter().pipe( // load order counter
                    map(counter => orderCounterLoaded({orderCount:counter})),
                    retry(3)
                ),
                this.orderService.loadMostSold().pipe( //load most sold
                    map(mostSoldItems => mostSoldItems.map(mostItem=> this.itemService // get details for the item by its id
                        .observeItem(mostItem.itemId).pipe(
                            map((item):BasketItem => ({...mostItem,name:item.name}))
                        )
                    )),
                    mergeMap(mostSold => zip(...mostSold)), //Combine all the results into an array after retriving the item  details from the id 
                    map(mostSold => mostSoldLoaded({mostSold:mostSold})), // dispatch amn action of loadedd
                    retry(3)
                )
        )),
    ));
}