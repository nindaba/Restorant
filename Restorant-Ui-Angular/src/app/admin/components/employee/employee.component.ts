import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details.model';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee:UserDetails = {
    username: '',
    name: '',
    email: '',
    userType: '',
    accountLocked: false
  }
  constructor() { }

  ngOnInit(): void {
  }
  activate(){
    this.employee.accountLocked =!this.employee.accountLocked; 
  }

}
