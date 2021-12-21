import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee:User = {
    username: '',
    name: '',
    email: '',
    accountLocked: false,
    type: ''
  }
  constructor() { }

  ngOnInit(): void {
  }
  activate(){
    this.employee.accountLocked =!this.employee.accountLocked; 
  }

}
