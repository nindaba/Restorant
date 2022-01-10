import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { UserHintComponent } from '../user-hint/user-hint.component';
@Component({
  selector: 'app-login-register',
  template: `

  <div class="content">
          <login (register)="register($event)" *ngIf="hasAccount"></login>
          <register (login) ="login($event)" *ngIf="!hasAccount"></register>
      </div>`,
  styles:[`
    .content{
      height: calc(100vh - 64px);
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class LoginRegisterComponent implements OnInit {
  hasAccount : Boolean = true;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(UserHintComponent);
  }

  login(event: any){
    this.hasAccount = true;
  }
  register(event: any){
    this.hasAccount = false;
  }
}

