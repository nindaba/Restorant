import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { inputTextValidator } from 'src/app/validators/validators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output('register')registerEvent: EventEmitter<any> = new EventEmitter()
  loginForm: FormGroup;
  constructor(formBuilder: FormBuilder,private userService:UserService) {
    this.loginForm = formBuilder
    .group({
      username: ['',inputTextValidator],
      password: ['',inputTextValidator],
    })
   }

  ngOnInit(): void {
  }
  register(){
    this.registerEvent.emit();
  }
  login(){
    this.userService
    .login(this.loginForm.value);
  }
}
