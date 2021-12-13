import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, zip } from "rxjs";
import { catchError, filter, map, mergeMap, take, takeLast, withLatestFrom } from "rxjs/operators";
import { RestorantApis } from "src/app/common-data/restorant.apis";
import { Item } from "src/app/models/item.model";
import { OrderService } from "src/app/services/order.service";
import * as OrderAction from "./order.action";
import { Count} from "./order.model";
import * as OrderSelector from "./order.selector";
import { Caller,Response } from "src/app/models/response.module";
import * as Messages from 'src/app/common-data/responses.messages'
import { logger } from "src/app/common-data/utils";
@Injectable()
export class OrderEffect{
    constructor(
            private orderService:OrderService,
            private actions:Actions,
            private store :Store,
            private http:HttpClient
    ){}
    onloadOrders = createEffect(()=>this.actions.pipe(
        ofType(OrderAction.loadOrders),
        mergeMap(
            ()=> this.orderService.loadOrders().pipe(
                map(order=> OrderAction.ordersLoadedSuccess({payload:order})),
                catchError(()=> of(OrderAction.addResponse(Messages.LOADING_ORDER_FAILED)))
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
                    OrderAction.initSelectedOrder({id:''}), // we choose 0 since it will be the with the latest time update
                    OrderAction.addResponse(Messages.SENDING_ORDER_SUCESS)
                ]),
                catchError(()=> [
                    OrderAction.addResponse(Messages.SENDING_ORDER_FAILED),
                    OrderAction.setBasket({isBasket:true})
            ])
            )),
        ))
    ));

    onLoadedItems = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.initSelectedOrder),
        mergeMap(props=> this.store.select(OrderSelector.getOrder(props.id)).pipe(
            filter(o=> o.orderItems.length > 0),            
            take(1),
            mergeMap(order => 
                zip(
                    ...[
                        of(OrderAction.setSelected({
                            id: props.id,
                            order:{...order,isBasket:false,items:[]}
                        })),
                        ...order.orderItems
                        .map(item => this.http.get<Item>(RestorantApis.ITEM_ID(item.itemId)).pipe(
                                map((completeItem:Item):Item&Count => ({...completeItem,count:item.number,price:item.price})),
                                map(item => OrderAction.loadSelectedItems({id:props.id,item: item}),
                                catchError(()=> of(OrderAction.addResponse(Messages.LOADING_ITEM_FAILED)))
                            )))
                        ]
                    )),
            mergeMap(actions => [
                ...actions, 
                OrderAction.addResponse(Messages.SENDING_ORDER_SUCESS)
            ]),
            catchError(()=> [
                OrderAction.addResponse(Messages.SENDING_ORDER_FAILED),
            ]
        )
        )
    ))
    );
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
