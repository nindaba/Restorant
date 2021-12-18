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
import { OrderReducer } from './store/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffect } from './store/order.effect';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeesComponent } from './components/employees/employees.component';

@NgModule({
  declarations:[
    MenuComponent,
    DashboardComponent,
    RegisterComponent,
    OrderViewComponent,
    OrderRequestComponent,
    EmployeeComponent,
    EmployeesComponent
  ],
  imports:[
    CommonModule,
    AdminRoutingModule,
    MatModule,
    ReactiveFormsModule, 
    StoreModule.forFeature(Common.FREATUE_KEY,OrderReducer)   ,
    EffectsModule.forFeature([OrderEffect])
  ]
})
export class AdminModule { }
