import { Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'fx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  search:string ='';
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }

 
}
