import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainViewComponent } from './order-view/main-view/main-view.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';

//TODO replace the first route with username and create interceptor to redirect to proper page
const routes: Routes = [
  // {path:'',redirectTo:'category',pathMatch:'full'},
  {path:'',redirectTo:'admin/category',pathMatch:'full'},
  // {path:'order-view',loadChildren: ()=> import('./order-view/order-view.module').then(module=> module.OrderViewModule)},
  // {path:'',redirectTo:'/orders',pathMatch:"full"},
  {path:'login',component:LoginRegisterComponent},
  {path:'orders',loadChildren: ()=> import('./order-view/order-view.module').then(module=> module.OrderViewModule),canActivate:[AuthGuard]},
  {path:'category',component:CategoryComponent},
  {path:'category/:categoryId',component:CategoryComponent},
  {path:'admin',loadChildren: ()=> import('./admin/admin.module').then(module=>module.AdminModule)},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { } 
