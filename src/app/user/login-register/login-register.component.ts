import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  hasAccount : Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  login(event: any){
    this.hasAccount = true;
  }
  register(event: any){
    this.hasAccount = false;
  }
}
