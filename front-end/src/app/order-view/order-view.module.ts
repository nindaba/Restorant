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



@NgModule({
  declarations: [
    MainViewComponent,
    OrderListComponent,
    OrderListItemComponent,
    OrderComponent,
    OrderItemComponent,
    OrderStatusComponent,
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
    ])
  ],
  providers:[OrderService]
})
export class OrderViewModule { }
