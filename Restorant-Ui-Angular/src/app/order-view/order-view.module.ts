import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { OrderTitleComponent } from './order-title/order-title.component';
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
import { OrderReducer } from './store/order.reducer';
import { OrderEffect } from './store/order.effect';
import { Common } from './store/order.model';
import { OrderStatusSkeleton } from '../skeletons/order-status-skeleton/order-status.skeleton';



@NgModule({
  declarations: [
    MainViewComponent,
    OrderListComponent,
    OrderTitleComponent,
    OrderComponent,
    OrderItemComponent,
    OrderStatusComponent,
    OrderItemSkeletonComponent,
    OrderListSkeletonComponent,
    OrderStatusSkeleton
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
    StoreModule.forFeature(Common.FREATUE_KEY,OrderReducer),
    EffectsModule.forFeature([OrderEffect]),
  ],
  providers:[OrderService]
})
export class OrderViewModule { }
