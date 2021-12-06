import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
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
export class RegisterComponent implements OnInit,OnDestroy {
  @Output('login') loginEvent : EventEmitter<any> = new EventEmitter();
  registerForm: FormGroup;
  displayImage: string | ArrayBuffer | null | undefined='item-default.jpg'; //get an initial picture
  uploadImage:File[]=[];
  imageButton: string ='primary';
  hasSubmitted:string='primary';
  hasDeleted:string = 'warn';
  _url:string[] =[];
  constructor(
    formBuilder:FormBuilder,
    private itemService:ItemServiceService,
    private categoryService:CategoryServiceService,
    private router:Router,
    private activateRoute :ActivatedRoute
    ) {
    this.registerForm = formBuilder
    .group({
      name:['',inputTextValidator],
      description:['',inputTextValidator],
      price:[0.0,inputTextValidator],
    });
   }
  ngOnDestroy(): void {
    this.uploadImage=[];
    this.imageButton='primary';
    this.hasSubmitted='primary';
    this.hasDeleted = 'warn'
    this._url =[];
  }

  ngOnInit(): void {
    this.activateRoute.url
    .subscribe(url=> this._url = 
      url.map(seg=>seg.path)
    );
    if(!this.categoryService.selected || !this.itemService.selected){ // this will check if none is selected and we will select
      let categoryId;
      let itemId;
      this.activateRoute.params.subscribe(param=>{
        categoryId = param['categoryId'];
        itemId  = param['itemId'];      
      })
      if(categoryId) this.categoryService.getCategory(categoryId).subscribe(category => this.categoryService.selected = category)
      if(itemId) this.itemService.selected = this.itemService.getItem(itemId);
    }
    this.title = ''; //this will initiaize the form
  }
  register():void{
    this.imageButton ='primary'
    if(this.registerForm.valid){
      this.hasSubmitted = '';
      // Check whether an image is choosen successfully
      //TODO: we go ahead and extract the id from the link and fetch the name of either category or item 
      if(this.url[1] == 'register')
      return this.categoryService.saveCategory({
          id:'',
          name: this.registerForm.get('name')?.value,
          description:this.registerForm.get('description')?.value,
          image:'',
          items:[]},this.uploadImage[0]
      );      
      if(this.url[1] =='edit' && this.categoryService.selected)
      return this.categoryService.editCategory({
          id:this.categoryService.selected.id,
          name: this.registerForm.get('name')?.value,
          description:this.registerForm.get('description')?.value,
          image:this.categoryService.selected.image,
          items:this.categoryService.selected.items},this.uploadImage[0]
      );
        
      if(this.url[2] == 'register' && this.categoryService.selected) 
      return this.itemService.saveItem({
        id:'',
        name: this.registerForm.get('name')?.value,
        description:this.registerForm.get('description')?.value,
        image:'',
        price: this.registerForm.get('price')?.value || 0.0,
        category:this.categoryService.selected?.id},this.uploadImage[0]
      );
      if(this.url[2] =='edit' && this.itemService.selected) 
      return this.itemService.editItem({
        id:this.itemService.selected.id,
        name: this.registerForm.get('name')?.value,
        description:this.registerForm.get('description')?.value,
        image:this.itemService.selected.image,
        price: this.registerForm.get('price')?.value,
        category:this.itemService.selected.category},this.uploadImage[0]
      );
    }
    else this.imageButton = 'warn';

      
  }
  imagePicked(event:any){
    this.uploadImage = event.target.files;
    let reader:FileReader = new FileReader();
    reader.readAsDataURL(this.uploadImage[0]);
    reader.onload = imageEvent => this.displayImage = imageEvent.target?.result;
    reader.onerror = error => this.uploadImage =[];
  }
  get isCategory():Boolean{
    return this.url[1] =='register'
    || this.url[1] =='edit'
  }
  get isEdit():Boolean{
    return this.url[1] =='edit'|| this.url[2] =='edit'
  }
  get title():string{
    if(this.url[1] =='register') return 'Register Category'
    if(this.url[1]=='edit' && this.url[2] ==this.categoryService.selected?.id)
    return 'Edit Category '+this.categoryService.selected?.name;
    if(this.url[2] == 'register') return 'Register Item'
    if(this.url[2] =='edit')return 'Edit Item '+this.itemService.selected?.name;
    return '';
  }
  set title(nothing:string){
    if(this.url[1]=='edit' && this.url[2] ==this.categoryService.selected?.id){
      this.registerForm.setValue({
        name:this.categoryService.selected?.name,
        description:this.categoryService.selected?.description,
        price:0.0
      })
      this.displayImage = this.categoryService.selected?.image
    } 
    if(this.url[2] =='edit'){
      this.registerForm.setValue({
        name:this.itemService.selected?.name,
        description:this.itemService.selected?.description,
        price:this.itemService.selected?.price,
      })
      this.displayImage = this.itemService.selected?.image
    }
  }
  get url():string[]{
    return this._url;
  }
  get successImage():Boolean{
    return this.uploadImage.length > 0;
  }
  back():void{
    if(this.url [1] =='register' || this.url[1] =='edit')
    this.router.navigate(['admin',...this.url.slice(0,1)])
    else this.router.navigate(['admin',...this.url.slice(0,2)])
  }
  delete(){
    this.hasDeleted = '';
    if(this.isCategory) this.categoryService.delete();
    else this.itemService.delete()
  }
}
