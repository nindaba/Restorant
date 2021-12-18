import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { logger } from 'src/app/common/utils';
import { CustomInputProps } from 'src/app/components/custom-input/custom-input.component';
import { Response } from 'src/app/models/response.module';
import { UserService } from 'src/app/services/user.service';
import { inputTextValidator } from 'src/app/validators/validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit ,OnDestroy{


  @Output('login') loginEvent : EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  hasSubmitted:Boolean = false;

  confPasswordProps: CustomInputProps = {name:'Confirm Password',type:'password'};
  usernameProps: CustomInputProps = {name:'username'}
  emailProps: CustomInputProps = {name:'email'}

  subscription:Subscription = new Subscription();

  constructor(
    formBuilder:FormBuilder,
    private userService:UserService,
    private router:Router) {
    this.registerForm = formBuilder
    .group({
      name:['',inputTextValidator],
      username:['',inputTextValidator],
      email:['',inputTextValidator],
      password:['',inputTextValidator],
      confirm:['',inputTextValidator]
    });
   }
  ngOnDestroy(): void {
    this.hasSubmitted= false;
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.registerForm.get('confirm')?.valueChanges.pipe(
      map(value => value !=this.registerForm.value.password)
    )
    .subscribe(value=> {
      if(value){
        this.confPasswordProps.invalid = value;
        this.registerForm.controls.confirm.setErrors({notMatching:true})
      }
      else this.confPasswordProps.invalid = false;
    }));
  }
  login(){
    this.loginEvent.emit();
  }
  register(){
    this.hasSubmitted=true;
    this.userService
    .register(this.registerForm.value)
    .subscribe(response =>{
      if(response.success) this.loginEvent.emit()
      else this.registerFailed(response.message)
    })
  }
  registerFailed(message:string){
    /**Reseting the invalids*/
    this.usernameProps.invalid= false;
    this.emailProps.invalid = false;

    this.registerForm.markAsTouched();
    this.hasSubmitted=false;
    // checking the response from the server
    if(message =='The username already taken'){
      this.usernameProps.invalid= true;
    }
    if(message =='The email already taken'){
      this.emailProps.invalid =true;
    }
  }
}


