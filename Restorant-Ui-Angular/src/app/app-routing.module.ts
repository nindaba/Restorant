import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CategoryComponent } from './components/category/category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainViewComponent } from './order-view/main-view/main-view.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';
import { AdminGuard } from './guards/admin.guard';
import { OrderService } from './services/order.service';

//TODO replace the first route with username and create interceptor to redirect to proper page
const routes: Routes = [
  // {path:'',redirectTo:'category',pathMatch:'full'},
  {path:'',redirectTo:'/category',pathMatch:'full'}, //TODO: change to orders as the default route
  {path:'login',component:LoginRegisterComponent},
  {path:'orders',loadChildren: ()=> import('./order-view/order-view.module').then(module=> module.OrderViewModule),canActivate:[AuthGuard]},
  {path:'category',component:CategoryComponent,canActivate:[AdminGuard]},
  {path:'category/:categoryId',component:CategoryComponent,canActivate:[AdminGuard]},
  {path:'admin',loadChildren: ()=> import('./admin/admin.module').then(module=>module.AdminModule),canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,OrderService]
})
export class AppRoutingModule { } 
