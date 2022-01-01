import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, retry } from "rxjs/operators";
import { LOADING_ITEM_FAILED, LOGIN_FAILED } from "src/app/common/responses.messages";
import { logger, TapLogger } from "src/app/common/utils";
import { addResponse } from "src/app/order-view/store/order.action";
import { OrderService } from "src/app/services/order.service";
import { loadMostSold, loadOrderCounter, mostSoldLoaded, orderCounterLoaded } from './order.action'
@Injectable()
export class PerformanceEffects{
    constructor(private actions:Actions,private orderService:OrderService){}
    onLoadMostSold = createEffect(()=> this.actions.pipe(
        ofType(loadMostSold),
        mergeMap(e=> this.orderService.loadMostSold().pipe(
            map(mostSold => mostSoldLoaded({mostSold:mostSold})),
            retry(3)
            )
        )
    ));
    onLoadOrderCounter = createEffect(()=> this.actions.pipe(
        ofType(loadOrderCounter),

        mergeMap(e=> this.orderService.loadOrderCounter().pipe(
            map(counter => orderCounterLoaded({orderCount:counter})),
            retry(3)
            )
        )
    ));
    
}