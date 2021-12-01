import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { ItemServiceService } from 'src/app/services/item-service.service';
import { UserService } from 'src/app/services/user.service';
import { inputTextValidator } from 'src/app/validators/validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output('login') loginEvent : EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  image: string | ArrayBuffer | null | undefined; //get an initial picture
  successImage:Boolean=false;
  imageButton: string ='primary';
  constructor(
    formBuilder:FormBuilder,
    private itemService:ItemServiceService,
    private categoryService:CategoryServiceService,
    private router:Router
    ) {
    this.registerForm = formBuilder
    .group({
      name:['',inputTextValidator],
      description:['',inputTextValidator],
      price:['',inputTextValidator],
      image:['',inputTextValidator],
    });
   }

  ngOnInit(): void {
  }
  login(){
    this.loginEvent.emit();
    this.registerForm
    .get('image')?.valueChanges
    .subscribe((value:string) => this.image = value)
  }
  register(){
    this.imageButton ='primary'
    if(this.successImage){// Check whether an image is choosen successfully
      let formValue = {
        data: this.registerForm.value,
        image: this.image||''
      }
      //TODO: we go ahead and extract the id from the link and fetch the name of either category or item 
      let url:string = this.router.url;
      if(url.startsWith('/admin/category/register')) this.categoryService.saveCategory(formValue)
      // if(url.startsWith('/admin/category/edit'))
  
      // //Lets try to cheat a litle of logic because 
      // //if the obove statements are not true it is running second routes
      // // which are items
      // if(url.includes('register')) 
      // if(url.includes('edit')) 
    }
    else this.imageButton = 'warn';

      
  }
  imagePicked(event:any){
    this.successImage = false;
    let reader:FileReader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = imageEvent => {
      this.image = imageEvent.target?.result
      this.successImage = true;
    };
  }
  get isCategory():Boolean{
    return this.router.url.startsWith('/admin/category/register')
    ||this.router.url.startsWith('/admin/category/edit')
  }
  get title():string{
    //TODO: we go ahead and extract the id from the link and fetch the name of either category or item 
    let url:string = this.router.url;
    if(url.startsWith('/admin/category/register')) return 'Register a category'
    if(url.startsWith('/admin/category/edit')) return 'Edit category'

    //Lets try to cheat a litle of logic because 
    //if the obove statements are not true it is running second routes
    // which are items
    if(url.includes('register')) return 'Register a category'
    if(url.includes('edit')) return 'Edit Item'
    return '';
  }
}
