import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { logger } from 'src/app/common/utils';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { RegisterComponent } from 'src/app/user/register/register.component';

@Component({
  selector: 'app-employees',
  template:`
  <div class="content">
    <fx-header>
            <h2 right>Employees</h2>
            <custom-input [(ngModel)]="search"
            [properties] = "{name:'Search',hasTitle:false,icon:'search'}"
            ></custom-input>
            <button left mat-button (click)="register()">
                    <mat-icon>add</mat-icon>Add
            </button>
    </fx-header>
    <div class="list">
      <employee  *ngFor="let employee of employees; index as index"
      [employee]="employee" (deleted)="remove(index)"></employee>
    </div>
  </div>
  `,
  styles: [`
  .content{
      height: 90%;
  }
  .list{
      height: 100%;
      padding: 0.25em;
      overflow-y: auto;
  }
  button{
      display: flex; 
      align-items: center;
  }
  `],
})
export class EmployeesComponent implements OnInit,OnDestroy {
  _employees: User[] = this.userService.newEmployee;
  search :string =''
  subscription: Subscription = new Subscription();
  constructor(public userService:UserService,private dialog:MatDialog,private rendere:Renderer2) { }
  ngOnDestroy(): void {
    this.userService.newEmployee =[];
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.subscription.add(
      this.userService.getEmployees().subscribe(employees => this._employees.push(...employees))
    )
  }
  register(){
    this.dialog.open(RegisterComponent);
  }
  get employees(): User[]{
    return this._employees.filter(employee => (employee.username+employee.name+employee.email)
    .toLocaleLowerCase()
    .search(this.search) > -1 );
  }
  remove(index:number):void{
    this._employees.splice(index,1);
  }
  @HostListener('window:scroll',[]) onScroll():void{
    logger("scr")
  }
}

