import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routin.module';
import { MatModule } from '../mat.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { OrderViewComponent } from './components/order-view/order-view.component';
import { OrderRequestComponent } from './components/order-request/order-request.component';
import { StoreModule } from '@ngrx/store';
import {Common} from './store/order.model'
import { OrderReducer, PerformanceReducer } from './store/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './store/order.effect';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PerformanceComponent } from './components/performance/performance.component';
import {NgxChartsModule} from '@swimlane/ngx-charts'
import { PerformanceEffects } from './store/performance.effects';

@NgModule({
  declarations:[
    MenuComponent,
    DashboardComponent,
    RegisterComponent,
    OrderViewComponent,
    OrderRequestComponent,
    EmployeeComponent,
    EmployeesComponent,
    PerformanceComponent,
  ],
  imports:[
    CommonModule,
    AdminRoutingModule,
    MatModule,
    ReactiveFormsModule, 
    NgxChartsModule,
    StoreModule.forFeature(Common.FREATUE_ORDER_KEY,OrderReducer),
    StoreModule.forFeature(Common.FREATUE_PERFORMANCE_KEY,PerformanceReducer),
    EffectsModule.forFeature([OrderEffect,PerformanceEffects])
  ]
})
export class AdminModule { }
