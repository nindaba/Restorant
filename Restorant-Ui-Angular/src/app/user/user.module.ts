import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatModule } from '../mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserHintComponent } from './user-hint/user-hint.component';
// import { CustomInputComponent } from '../components/custom-input/custom-input.component';

@NgModule({
  declarations: [
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    UserHintComponent,
    // CustomInputComponent
  ],
  imports: [
    CommonModule,   
    MatModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
