import { Directive, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { CategoryItem } from '../models/category-item.model';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';

@Directive({
  selector: '[ForCategoriesItems]'
})
export class ForCategoriesItemsDirective {
  @Input() set ForCategoriesItems(categoriesItems: Category[] | Item[]){
    console.log(this.elementRef)
  }
  constructor(public elementRef:ElementRef,public viewContainer: ViewContainerRef) {}

}
