import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { logger, TapLogger } from "src/app/common/utils";
import { OrderService } from "src/app/services/order.service";
import { loadOrderCounter, orderCounterLoaded } from './order.action'
@Injectable()
export class PerformanceEffects{
    constructor(private actions:Actions,private orderService:OrderService){
    }
    onLoadOrderCounter = createEffect(()=> this.actions.pipe(
        ofType(loadOrderCounter),
        mergeMap(() =>{
            return this.orderService.loadOrderCounter()
            .pipe(
                map(order => orderCounterLoaded({orderCount:order}))
            )
        })
    ));
}