import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomInputComponent } from "./components/custom-input/custom-input.component";
import {FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { CategorySkeletonComponent } from "./skeletons/category-skeleton/category-skeleton.component";
import { HeaderComponent } from "./components/header/header.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog'
@NgModule({
    imports:[
        MatIconModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatBadgeModule,
        ScrollingModule,
        MatSnackBarModule,
        FlexLayoutModule,
        MatStepperModule,
        MatTabsModule, 
        CustomInputComponent,
        MatProgressSpinnerModule,
        FormsModule,
        HeaderComponent,
        CategorySkeletonComponent,  
        MatTooltipModule,
        MatPaginatorModule,
        MatDialogModule
    ],
    declarations: [
      CustomInputComponent,
      CategorySkeletonComponent,
      HeaderComponent
    ]
  })
  export class MatModule { }