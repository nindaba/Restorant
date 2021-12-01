import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CategoryServiceService } from './services/category-service.service';
import { ItemServiceService } from './services/item-service.service';

import { MatModule } from './mat.module';
import { ForCategoriesItemsDirective } from './directives/for-categories-items.directive';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { BasketItemComponent } from './components/basket-item/basket-item.component';
import { BasketServiceService } from './services/basket-service.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderViewModule } from './order-view/order-view.module';
import { CategorySkeletonComponent } from './skeletons/category-skeleton/category-skeleton.component';
import { UserModule } from './user/user.module';
import { UserService } from './services/user.service';
import { TokenInterceptor } from './token-interceptor.interceptor';
import { CommonModule } from '@angular/common';
// import { CustomInputComponent } from './components/custom-input/custom-input.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoryCardComponent,
    DashboardComponent,
    CategoryComponent,
    ForCategoriesItemsDirective,
    ItemCardComponent,
    BasketItemComponent,
    NotFoundComponent,
    CategorySkeletonComponent,
    // CustomInputComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatModule, 
    OrderViewModule  ,
    UserModule,
  ],
  providers: [
    CategoryServiceService,
    ItemServiceService,
    BasketServiceService,
    UserService,
    {provide:HTTP_INTERCEPTORS,useClass: TokenInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
