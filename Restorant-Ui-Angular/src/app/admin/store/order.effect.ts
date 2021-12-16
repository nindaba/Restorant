import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, throwError, zip } from "rxjs";
import { catchError, delay, filter, map, mergeMap, repeatWhen, retry, retryWhen, take, takeLast, tap, withLatestFrom } from "rxjs/operators";
import { RestorantApis } from "src/app/common/restorant.apis";
import { Item } from "src/app/models/item.model";
import { OrderService } from "src/app/services/order.service";
import * as OrderAction from "./order.action";
import { Count} from "./order.model";
import * as OrderSelector from "./order.selector";
import { Caller,Response } from "src/app/models/response.module";
import * as Messages from 'src/app/common/responses.messages'
import { logger } from "src/app/common/utils";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ItemService } from "src/app/services/item-service.service";
@Injectable()
export class OrderEffect{
    constructor(
            private orderService:OrderService,
            private actions:Actions,
            private store :Store,
            private itemService:ItemService,
            private userService:UserService,
            private router:Router
    ){ }
    onloadOrders = createEffect(()=>this.actions.pipe(
        ofType(OrderAction.loadOrders),
        mergeMap(
            ()=> this.store.select(OrderSelector.isEmpty())
            .pipe(
                take(1),
                filter(empty => empty == true),
                mergeMap(
                    ()=> this.orderService.loadOrders(true).pipe(
                        map(order=> OrderAction.ordersLoadedSuccess({payload:order})),
                        catchError(()=> of(OrderAction.addResponse(Messages.LOADING_ORDER_FAILED)))
                    )
                )
            )
            
        )
    ));
    // onSendOrder = createEffect(()=> this.actions.pipe(
    //     ofType(OrderAction.sendOrder),
    //     mergeMap(()=> this.store.select(OrderSelector.getSelected()).pipe(
    //         take(1),
    //         mergeMap(order=> this.orderService.sendOrder(order).pipe(
    //             mergeMap(response => [
    //                         OrderAction.orderSendSuccess({response:response}),
    //                         OrderAction.addResponse(Messages.SENDING_ORDER_SUCESS),
    //                         OrderAction.initSelectedOrder({id:response.headers.get('Location') || ''}) // we choose 0 since it will be the with the latest time update
    //                     ]), 
    //                     catchError(()=> [
    //                         OrderAction.addResponse(Messages.SENDING_ORDER_FAILED),
    //                         OrderAction.setBasket({isBasket:true})
    //                 ])
    //         )),
    //     ))
    // ));
    onLoadedItems = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.initSelectedOrder),
        map(props => props.id == 'INITIAL' ? ({id:this.router.url.split('/').slice(-1)[0]}) : props),
        mergeMap(props=> this.store.select(OrderSelector.getOrder(props.id)).pipe(
            map(order => {
                if(order.orderItems.length == 0) throw 'not found';
                return order;
            }),
            take(1),
            mergeMap(order => 
                zip(
                    ...[
                        of(OrderAction.setSelected({
                            id: props.id,
                            order:{...order,isBasket:false,items:[]}
                        })),
                        ...order.orderItems
                        .map(item => this.itemService.observeItem(item.itemId).pipe(
                                map((completeItem:Item):Item&Count => ({...completeItem,count:item.number,price:item.price})),
                                map(item => OrderAction.loadSelectedItems({id:props.id,item: item}),
                                catchError(()=> of(OrderAction.addResponse(Messages.LOADING_ITEM_FAILED)))
                            )))
                        ]
                    )),
            mergeMap(actions => [
                ...actions, 
                OrderAction.addResponse(Messages.LOADING_ORDER_SUCESS)
            ]),
            retryWhen(error => error.pipe(
                delay(2000)
            ))
        )
    ))
    );
    onChangeUser = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.isUserChanged),
        mergeMap(metadata=>
             this.store.select(OrderSelector.isUserChanged(this.userService.userInfo.payload.userId))
             .pipe(
                 take(1),
                 map(id=> OrderAction.onUserChanged({userId:id}))
                 )
        )
    ));
    onUpdateStatus = createEffect(()=> this.actions.pipe(
        ofType(OrderAction.updateStatus),
        mergeMap(props=>
            this.store.select(OrderSelector.getSelected()).pipe(
                take(1),
                mergeMap(order=> this.orderService.update(order,props.status).pipe(
                    map( c => OrderAction.addResponse(Messages.SENDING_ORDER_SUCESS)),
                    // map(c => OrderAction.initSelectedOrder({id:c})),
                    catchError(()=> of(OrderAction.addResponse(Messages.SENDING_ORDER_FAILED))),
                )),
            )
        )
    ));
}
