import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order/order.component';
import { MatModule } from '../mat.module';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderService } from '../services/order.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderItemSkeletonComponent } from '../skeletons/order-item-skeleton/order-item.component';
import { OrderListSkeletonComponent } from '../skeletons/order-list-skeleton/order-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Common } from './store/order.initial';
import { OrderReducer } from './store/order.reducer';
import { OrderEffect } from './store/order.effect';



@NgModule({
  declarations: [
    MainViewComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderComponent,
    OrderItemComponent,
    OrderStatusComponent,
    OrderItemSkeletonComponent,
    OrderListSkeletonComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'',component:MainViewComponent,children:[
        {path:'',component:OrderComponent},
        {path:':orderId',component:OrderComponent}
      ]}
    ]),
    // StoreModule.forFeature(Common.FREATUE_KEY,OrderRducer),
    // EffectsModule.forFeature([OrderEffect]),
  ],
  providers:[OrderService]
})
export class OrderViewModule { }
