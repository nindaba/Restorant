import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  hasSubmitted:string = 'primary';
  constructor(formBuilder: FormBuilder,private userService:UserService) {
    this.loginForm = formBuilder
    .group({
      username: ['',inputTextValidator],
      password: ['',inputTextValidator],
    })
   }
  ngOnDestroy(): void {
    this.hasSubmitted = 'primary'
  }

  ngOnInit(): void {
  }
  register(){
    this.registerEvent.emit();
  }
  login(){
    this.hasSubmitted ='';
    this.userService
    .login(this.loginForm.value);
  }
}
