import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadOrderCounter } from '../../store/order.action';
import { NameValue, OrderCount } from '../../store/order.model';
import { getOrderCounter} from '../../store/performance.selectors';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  orderCounter:Observable<OrderCount[]> = new Observable();
  orderNameValue:Observable<NameValue[]> = new Observable();
  constructor(private store:Store){}
  ngOnInit(): void {
    this.store.dispatch(loadOrderCounter());
    this.orderCounter = this.store.select(getOrderCounter());
    this.orderNameValue = this.orderCounter.pipe(
      map(counters => counters
        .map((counter):NameValue => ({name:counter.status,value:counter.totalAmount})
      ))
      );
  }
  search:string ='';


  scheme:any = {
    domain: ["#5353d1","#4cbda5","#ffd93d","#3dfff1","#c78ba8","#000ab1"]
  };
  orderColors:any = {
    domain: ["#5353d1","#4cbda5","#f75252","#3dfff1","#c78ba8","#ffb620"]
  };
  barPadding: any = 110;


  mostSelling:NameValue[] = [
    {name: 'Apple',value: 410},
    {name: 'Cakes',value: 230},
    {name: 'Tomatoe',value: 500},
    {name: 'Burundian Coffe',value: 200},
    {name: 'Coke',value: 200},
  ]
  ordersCount: any =[
      {name: 'New Orders',value: 100},
      {name: 'Accepted',value: 80},
      {name: 'Canceled',value: 20},
      {name: 'Cooked',value: 80},
      {name: 'Ready',value: 70},
      {name: 'Served',value: 50},
      {name: 'Payed',value: 49},
  ]

  days : any = [
    {
      name: 'Monday',
      value: 49
    },
    {
      name: 'Tuesday',
      value: 32
    },
    {
      name: 'Wenesday',
      value: 5
    },
    {
      name: 'Thursday',
      value: 40
    },
    {
      name: 'Friday',
      value: 10
    },
    {
      name: 'Saturday',
      value: 30
    },
    {
      name: 'Sunday',
      value: 71
    }
  ]
  months: any = [
    {
      "name": "Jan",
      "value": 36000
    },
    {
      "name": "Feb",
      "value": 2400
    },
    {
      "name": "March",
      "value": 6000
    },
    {
      "name": "Apr",
      "value": 3000
    },
    {
      "name": "May",
      "value": 10000
    },
    {
      "name": "June",
      "value": 5000
    },
    {
      "name": "July",
      "value": 7300
    },
    {
      "name": "Aug",
      "value": 1000
    },
    {
      "name": "Sept",
      "value": 3000
    },
    {
      "name": "Nov",
      "value": 8000
    },
    {
      "name": "Dec",
      "value": 20000
    },
  ]

}
