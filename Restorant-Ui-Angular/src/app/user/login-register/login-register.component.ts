import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  template: `

  <div class="content"
      #tooltip = "matTooltip"
      matTooltip="
      DEFAULT EMPLOYEE ACCOUNT ---> username: employee & password: employee, 
      DEFAULT CLIENT ACCOUNT ---> username: client & password: client
      ">
          <login (register)="register($event)" *ngIf="hasAccount"></login>
          <register (login) ="login($event)" *ngIf="!hasAccount"></register>
      </div>`,
  styles:[`
    .content{
      width: 100%;
      height: 80%;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `]
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
