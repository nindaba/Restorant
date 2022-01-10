import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: 'users-hint',
  template:`
  <div class="container">
    <h2>Default Users</h2>
    <div class="user">
      <h3>Client</h3>
      <span>Username: client</span>
      <span>Password: client</span>
    </div>
    <div class="user">
      <h3>Employee</h3>
      <span>Username: employee</span>
      <span>Password: employee</span>
    </div>
    <button mat-flat-button color="primary" (click)="close()">Okay</button>
  </div>
  `,
  styles:[
    `
    .container{
      width: 300px;
    }
    .user{
        margin-bottom: 1em;
        display: flex;
        flex-direction: column;
    }
    button{
      background-color: white;
      float: right;
    }
    h3{
      font-weight: 500;
    }
    @media(max-width: 768px){
    .container{
      width: 100%;
    }
    }
    `
  ]
})
export class UserHintComponent implements OnInit{
  constructor(private dialogRef:MatDialogRef<UserHintComponent>){}
  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }
}