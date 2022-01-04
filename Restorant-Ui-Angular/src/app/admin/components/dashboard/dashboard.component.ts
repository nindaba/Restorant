import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'dashboard',
  template:`
  <div class="content">
    <div class="menu">
        <admin-menu></admin-menu>
    </div>
    <div class="outlet">
        <router-outlet ></router-outlet>
    </div>
  </div>
  `,
  styles:[
    `
    .content{
      display:flex;
      height: 100%;
    }
    .outlet{
      flex: .8;
      height:100%;
      /* overflow-y:auto; */
    }
    .menu{
      flex:.2;
      height:100%;
    }
    `
  ],
})
export class DashboardComponent implements OnInit {
  title:string='';
  constructor() { }

  ngOnInit(): void {
  }

}
