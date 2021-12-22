import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { logger } from 'src/app/common/utils';
import { Response } from 'src/app/models/response.module';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styles: [`
    .content{
        border: 1px solid  white;
        background-color: white;
        border-radius: 5px;
        margin-bottom: .25em;
        padding-left: 1em;

    }
    table{
        width: 100%;
    }
  `]
})
export class EmployeeComponent implements OnInit{
  employee:User = {
    username: '',
    name: '',
    email: '',
    accountLocked: false,
    type: ''
  }

  //the reson i did this I thought that TS filters out the unwanted fields but it does not
  //so I need to fix this from the api
  @Input('employee') set init(employee:User){
    this.employee.username = employee.username;
    this.employee.name = employee.name;
    this.employee.email = employee.email;
    this.employee.type = employee.type;
    this.employee.accountLocked = employee.accountLocked;
    this.employee.userId = employee.userId;
  }
  @Output() deleted :EventEmitter<any> = new EventEmitter();
  togglePending: boolean = false;
  constructor(private userSevice:UserService) { }

  ngOnInit(): void {
  }
  activate(){
    this.employee.accountLocked = !this.employee.accountLocked;
    this.togglePending = true;
    this.userSevice.update(this.employee).subscribe(resp => {
      if(!resp.success) this.employee.accountLocked = !this.employee.accountLocked; 
      this.togglePending = false;
    })
  }
  delete():void{
    if(this.employee.userId) this.userSevice.delete(this.employee.userId)
    .subscribe(response=> {
      if(response) this.deleted.emit();
    });
  }
}
