import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { copy } from 'src/app/common/utils';
import { BasketServiceService } from 'src/app/services/basket-service.service';
import { UserService } from 'src/app/services/user.service';
import * as OrderAction from '../store/order.action';
import { isEmpty } from '../store/order.selector';

@Component({
  selector: 'app-main-view',
  template:`
    <div class="content">
      <!-- <div class="burger" (click)="onMenu()">
        <div class="line first"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div> -->
    <div class="order-list {{menu ? 'menu' : ''}}">
          <order-list *ngIf="!(isEmpty|async)" (click)="onSelected()"></order-list>
          <order-list-skeleton *ngIf="isEmpty|async"></order-list-skeleton>
      </div>
      <div class="order-display  {{menu ? '' : 'selected'}}">
          <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles:[`
  .content{
      display: flex;
      flex-direction: row;
      padding: 0 0 0px 50px;
      height: calc(100vh - 64px);
      /* justify-content: space-around; */
      /* background-color: indigo; */
  }
  .burger{
    display:none;
  }
  .order-list{
    flex: .25;
  }
  .order-display{
      flex: .7;
      /* background-color: green; */
  }
  @media(max-width: 768px){
    .burger{
        display: flex;
        flex-direction: column;
        margin-top: 1em;
        cursor: pointer;
        position: absolute;
        float: right;
        z-index:2;
        right: 2em;
    }
    .line{
        height: .25em;
        width: 1.5em;
        background-color: rgb(48, 48, 48);
        margin-top: .25em;
    }
    .first{
      background-color: #009688;
    }
    .content{
      padding:0 2em;
    }
    .order-list,.order-display{
      display:none;
    }
    .selected,.menu{
      flex: 1;
      display:initial;
    }
  }
  
  `]
})
export class MainViewComponent implements OnInit{
  // menu:Boolean =false;
  constructor(private store:Store,private service:BasketServiceService,private userService:UserService) { }
  isEmpty:Observable<Boolean> = new Observable(observaber=> observaber.next(true));
  ngOnInit(): void {
    this.store.dispatch(OrderAction.isUserChanged())
    this.isEmpty = this.store.select(isEmpty());
    this.store.dispatch(OrderAction.loadOrders());
    if(this.service.order.isBasket) this.store.dispatch(OrderAction.setSelected({id:'INITIAL',order:copy(this.service.order)}));

  }

  onSelected(){
    // this.menu = false;
    this.userService.onMenu();
  }
  // onMenu(){
  //   this.menu = true;
  //   this.userService.onMenu();
  // }
  get menu():Boolean{
    return this.userService.menuActive;
  }
}
