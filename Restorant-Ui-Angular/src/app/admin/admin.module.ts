import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routin.module';
import { MatModule } from '../mat.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../components/custom-input/custom-input.component';


@NgModule({
  declarations:[
    MenuComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports:[
    CommonModule,
    AdminRoutingModule,
    MatModule,
    ReactiveFormsModule,    
  ]
})
export class AdminModule { }
