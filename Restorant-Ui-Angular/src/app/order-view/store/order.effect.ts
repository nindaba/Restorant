import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { Store } from "@ngrx/store";
import { EMPTY, interval, Observable, of, zip } from "rxjs";
import * as Rxjs from "rxjs";
import { catchError, filter, flatMap, map, mergeMap, switchMap, take } from "rxjs/operators";
import { RestorantApis } from "src/app/common-data/restorant.apis";
import { BasketItem } from "src/app/models/basket-item.model";
import { Item } from "src/app/models/item.model";
import { Order } from "src/app/models/order.model";
import { ItemService } from "src/app/services/item-service.service";
import { OrderService } from "src/app/services/order.service";
import * as OrderAction from "./order.action";
import { Common } from "./order.initial";
import { copy, Count, SelectedOrder } from "./order.model";
import * as OrderSelector from "./order.selector";

@Injectable()
export class OrderEffect{
    constructor(
            private orderService:OrderService,
            private itemService:ItemService,
            private actions:Actions,
            private store :Store,
            private http:HttpClient
    ){}
    onloadOrders = createEffect(()=>this.actions.pipe(
        ofType(OrderAction.loadOrders),
        mergeMap(
            ()=> this.orderService.loadOrders().pipe(
                map(order=> OrderAction.ordersLoadedSuccess({payload:order})),
                catchError(()=> of(OrderAction.onError({message:'Failed to load orders'})))
            )
        )
    ));
    onSendOrder = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.sendOrder),
        mergeMap(()=> this.store.select(OrderSelector.getSelected()).pipe(
            take(1),
            mergeMap(order=> this.orderService.sendOrder(order).pipe(
                mergeMap(response => [
                    OrderAction.orderSendSuccess({response:response}),
                    OrderAction.initSelectedOrder({index:0}) // we choose 0 since it will be the with the latest time update
                ]),
                catchError(()=> of(OrderAction.onError({message:'Failed to send'})))
            )),
           
        ))
    ));

    onLoadedItems = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.initSelectedOrder),
        mergeMap(props=> this.store.select(OrderSelector.getOrder(props.index)).pipe(
            filter(o=> o.orderItems.length > 0),
            take(1),
            mergeMap(order => 
                zip(
                    ...[
                        of(OrderAction.setSelected({order:{...order,isBasket:false,items:[]}})),
                        ...order.orderItems
                        .map(item => this.http.get<Item>(RestorantApis.ITEM_ID(item.itemId)).pipe(
                                map((completeItem:Item):Item&Count => ({...completeItem,count:item.number,price:item.price})),
                                map(item => OrderAction.loadSelectedItems({item: item}),
                                catchError(()=> of(OrderAction.onError({message:`Failed to load item :${item.itemId}`})))
                            )))
                        ]
                    )),
            mergeMap(actions => [...actions]),
            catchError(()=> of(OrderAction.onError({message:`Failed to load item :${props.index}`})))
        )
    )));
    // double = createEffect(()=> this.actions.pipe(
    //     ofType(OrderAction.onError),
    //     mergeMap(c =>
    //         zip(
    //             of(OrderAction.onError({message:'frirst DOUBLE'})),
    //             of(OrderAction.loadSelectedItems)
    //         )),
    //     mergeMap(res => [...res])
    // ));
}
