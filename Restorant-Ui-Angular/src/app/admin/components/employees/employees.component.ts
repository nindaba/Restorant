import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/models/user-details.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Observable<UserDetails[]> = new Observable();
  constructor(public userService:UserService) { }

  ngOnInit(): void {
    this.employees = this.userService.getEmployees();
  }

}
