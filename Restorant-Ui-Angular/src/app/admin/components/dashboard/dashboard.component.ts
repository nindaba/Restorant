import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dashboard',
  template:`
  <div class="content">
  <div class="menu {{userService.menuActive ? 'active' :''}}">
        <admin-menu></admin-menu>
    </div>
    <div class="outlet {{userService.menuActive ? '':'active'}}" >
        <router-outlet ></router-outlet>
    </div>
  </div>
  `,
  styles:[
    `
    .content{
      height: calc(100vh - 64px);
      display: flex;
      flex-direction: row;
    }
    .outlet{
      flex: .8;
      height:100%;
      overflow-y:auto;
    }
    .menu{
      flex: .2;
      height:100%;
    }
    @media(max-width:768px){
      /* .content{
        background-color: red;
      } */
      .menu ,.outlet{
        flex:1;
        display:none;
      }
      .active{
        display: initial;
      }
    }
    `
  ],
})
export class DashboardComponent implements OnInit{
  title:string='';
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }
}
