import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Common, PerformanceState } from "./order.model"

const getOrderCounter = ()=> createSelector(
    createFeatureSelector(Common.FREATUE_PERFORMANCE_KEY),
    (state:PerformanceState)=> state.orderCounter
);
const getMostSoldItems = ()=> createSelector(
    createFeatureSelector(Common.FREATUE_PERFORMANCE_KEY),
    (state:PerformanceState)=> state.mostSoldItems
);
export {
    getOrderCounter,
    getMostSoldItems
}