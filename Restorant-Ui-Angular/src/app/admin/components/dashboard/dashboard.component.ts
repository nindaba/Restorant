import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'dashboard',
  template:`
  <div fxLayout="row" fxLayoutAlign="start start" class="content">
    <div fxFlex="20" class="menu">
        <admin-menu></admin-menu>
    </div>
    <div fxFlex="75" class="outlet">
        <router-outlet ></router-outlet>
    </div>
  </div>
  `,
  styles:[
    `
    .content{
      height: 100%;
    }
    .outlet{
      width:100%;
      height:100%;
      /* overflow-y:auto; */
    }
    .menu{
      width:100%;
      height:100%;
    }
    `
  ],
})
export class DashboardComponent implements OnInit {
  title:string='';
  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
