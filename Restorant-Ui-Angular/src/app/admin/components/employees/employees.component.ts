import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { logger } from 'src/app/common/utils';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit,OnDestroy {
  employees: Observable<User[]> = new Observable();
  constructor(public userService:UserService,private dialog:MatDialog) { }
  ngOnDestroy(): void {
    this.userService.newEmployee =[];
  }

  ngOnInit(): void {
    this.employees = this.userService.getEmployees();
  }
  register(){
    this.dialog.open(RegisterComponent);
  }
}
