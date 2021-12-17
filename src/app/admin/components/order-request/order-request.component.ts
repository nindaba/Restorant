import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, take } from 'rxjs/operators';
import { logger } from 'src/app/common/utils';
import { CategoryService } from 'src/app/services/category-service.service';
import { UserService } from 'src/app/services/user.service';
import { initSelectedOrder } from '../../store/order.action';
import { INITIAL_ORDER_TITLEL } from '../../store/order.initial';
import { OrderTitle } from '../../store/order.model';

@Component({
  selector: 'order-request',
  templateUrl: './order-request.component.html',
  styleUrls: ['./order-request.component.css']
})
export class OrderRequestComponent implements OnInit {
  @Input()  title: OrderTitle =INITIAL_ORDER_TITLEL;
  constructor(private router:Router,private store:Store) {
  }
  ngOnInit(): void {
  }
  viewOrder(){ //(click)="viewOrder()"
    this.store.dispatch(initSelectedOrder({id:this.title.orderId}));
    this.router.navigate(['admin/orders',this.title.orderId]); //[routerLink]="[title.orderId]"
  }
}
