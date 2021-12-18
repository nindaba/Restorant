import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { logger } from 'src/app/common/utils';
import { CustomInputProps } from 'src/app/components/custom-input/custom-input.component';
import { UserService } from 'src/app/services/user.service';
import { inputTextValidator } from 'src/app/validators/validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  @Output('register')registerEvent: EventEmitter<any> = new EventEmitter()
  loginForm: FormGroup;
  hasSubmitted:Boolean = false;
  _nameProps: CustomInputProps ={name:'username'}
  _passProps: CustomInputProps ={name:'Password',type:'password'}
  subscription: Subscription = new Subscription();
  constructor(formBuilder: FormBuilder,private userService:UserService,private router:Router) {
    this.loginForm = formBuilder
    .group({
      username: ['',inputTextValidator],
      password: ['',inputTextValidator],
    })
   }
  ngOnDestroy(): void {
    this.hasSubmitted = false
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
      this.subscription
      .add(this.loginForm.get('username')?.statusChanges
        .subscribe(value=> this._nameProps.invalid = value == 'INVALID'))
      .add(this.loginForm.get('password')?.statusChanges
        .subscribe(value=> this._passProps.invalid = value == 'INVALID'));
  }
  register(){
    this.registerEvent.emit();
  }
  get nameProps():CustomInputProps{
    return this._nameProps;
  }
  get passProps():CustomInputProps{
    return this._passProps;
  }
  login(){
    this.hasSubmitted =true;
    this.userService
    .login(this.loginForm.value)
    .subscribe(
      response=> {
        this.loginForm.reset();
        if(response.success) this.router.navigate(['/'])
        else{
          this.loginForm.markAsTouched();
          this.hasSubmitted =false;
        }
      }
      )
  }
}