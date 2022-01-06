import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logger } from 'src/app/common/utils';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-menu',
  template: `
  <div class="content">
    <div class="menu" [ngClass]="orderClass" (click)="select('orders')">
        <mat-icon>list_alt</mat-icon>
        <label>Orders</label>
    </div>
    <div class="menu" [ngClass]="categoryClass" (click)="select('category')">
        <mat-icon>fastfood</mat-icon>
        <label>Categories</label>
    </div>
    <div class="menu" [ngClass]="employeesClass" (click)="select('employess')">
        <mat-icon>people</mat-icon>
        <label>Employees</label>
    </div>
    <div class="menu" [ngClass]="performanceClass" (click)="select('performance')">
        <mat-icon>trending_up</mat-icon> 
        <label>Performance</label>
    </div>
    <div class="user" *ngIf="userService.isLoggedIn">
        <span class="name">
            <mat-icon>account_circle</mat-icon>
            {{userService.username}}
        </span>
        <span class="name" (click)="userService.logout()">
            <mat-icon>logout</mat-icon>
            Logout
        </span>
    </div>
  </div>
  `,
  styles: [
    `
    .content{
        background-color: white;
        color: rgb(27, 26, 26);
        padding: 2em;
        border-radius: 5px;
        height: 90%;
    }
    .menu{
        display: flex;
        align-items: center;
        height: 4em;
        border-bottom: 2px solid rgb(122, 122, 122);
        cursor: pointer;
    }
    .menu label{
        cursor: pointer;
        margin-left: 1em;
    }
    .selected{
        color: #009688;
        border-bottom: 5px solid #009688;
    }
    mat-divider{
        margin-bottom: 1em;
    }
    .user{
      width: 90%;
      display:flex;
      flex-direction: column;
      /* justify-content:space-between; */
      position: absolute;
      align-items: center;
      bottom: 0;
    }
    .name{
      display:flex;
      flex-direction: row;
      justify-content:space-between;
      align-items: center;
      margin-bottom:1em;
    }
    .mat-icon{
      cursor: pointer;
    }
    /* .user{
        display:none;      
      } */
    @media(min-width: 769px){
      .user{
        display:none;   
      }
    }
    `
  ]
})
export class MenuComponent implements OnInit {

  orderClass:string ='';
  performanceClass:string ='';
  categoryClass:string= '';
  employeesClass:string='';
  constructor(private router:Router,public userService:UserService) { }

  ngOnInit(): void {
    this.select(this.router.url.split('/')[2]);
  }
  select(menu :string){
    this.userService.onMenu();
    this.clear();
    if(menu == 'orders')this.orderClass ='selected';
    if(menu == 'performance')this.performanceClass ='selected';
    if(menu == 'employess') this.employeesClass ='selected';
    if(menu == 'category')this.categoryClass = 'selected';
    this.router.navigate(['admin',menu]);
  }
  clear(){
    this.orderClass ='';
    this.performanceClass ='';
    this.categoryClass= '';
    this.employeesClass='';
  }
}
