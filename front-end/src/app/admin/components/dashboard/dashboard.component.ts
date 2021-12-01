import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title:string='';
  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.activeRoute
    // .params
    // .subscribe((params:Params)=>{
    //   let menu:string  = params['chosen-menu'];
    //   this.title = menu?.replace(menu.charAt(0),menu.charAt(0).toUpperCase())
    // });
  }

}
