import { Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'fx-header',
  template:`
  <div class="content">
    <ng-content select="[left]"></ng-content>
    <ng-content></ng-content>
    <ng-content select="[right]"></ng-content>
    
  </div>  
  `,
  styles:[`
  .content{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    height:64px;
    justify-content: space-between;
    padding: 0 2em;
      
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
