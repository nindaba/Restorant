import { Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'fx-header',
  template:`
  <div fxLayout="row" fxLayoutAlign="space-between center" fx class="content">
    <ng-content select="[right]"></ng-content>
    <ng-content></ng-content>
    <ng-content select="[left]"></ng-content>
  </div>  
  `,
  styles:[`
  .content{
      width:100%;
      background-color: white;
      padding: .25em;
  }
  .title{
      width:100%;
      display:flex;
      align-items: center;
  }
  .pd-category{
      padding: 0 2.5em 0 2.5em;
  }
  .no-pd-category{
      padding: 0;
  }
  `]
})
export class HeaderComponent implements OnInit,OnDestroy {
  search:string ='';
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

 
}
