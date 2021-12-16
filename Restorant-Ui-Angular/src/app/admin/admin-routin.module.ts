import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryComponent } from "../components/category/category.component";
import { OrderComponent } from "../order-view/order/order.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MenuComponent } from "./components/menu/menu.component";
import { OrderViewComponent } from "./components/order-view/order-view.component";
import { RegisterComponent } from "./components/register/register.component";
const routes: Routes =[    
    { path:'',component:DashboardComponent,children:[
        {path:'',redirectTo:'category',pathMatch:'full'},

        {path:'category',component:CategoryComponent},
        {path:'category/register',component:RegisterComponent},
        {path:'category/edit/:categoryId',component:RegisterComponent},

        {path:'category/:categoryId',component:CategoryComponent},
        {path:'category/:categoryId/register',component:RegisterComponent},
        {path:'category/:categoryId/edit/:itemId',component:RegisterComponent},

        {path:'orders',component:OrderViewComponent},
        {path:'orders/:orderId',component:OrderComponent},
        // {path:'accounts',component:MenuComponent},
    ]}
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AdminRoutingModule{}