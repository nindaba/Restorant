import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'restorant';
  constructor(public userService:UserService){}
  ngOnInit(): void {
  }

  //We need this for our template

  //userService.isLoggedIn;
  //userService.logout();
  //userService.username;


}
