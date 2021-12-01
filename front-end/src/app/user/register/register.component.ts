import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { inputTextValidator } from 'src/app/validators/validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output('login') loginEvent : EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
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

  ngOnInit(): void {
    
  }
  login(){
    this.loginEvent.emit();
  }
  register(){
    this.userService
    .register(this.registerForm.value)
    .subscribe({
      next: response => this.loginEvent.emit(),
      error: response => console.log(response)
    })
    
  }
}
