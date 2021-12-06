import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>CustomInputComponent),multi:true}]
})
export class CustomInputComponent implements ControlValueAccessor{
  @Input('properties') properties: any;
  _value: string;
  constructor() { 
    this.properties = {iconColor: '',iconName:'',isPassword:false};
    this._value = '';
  }
  set value(value:string){
    this._value = value;
    this.onChange(value);
  }
  get value():string{return this._value;}
  writeValue(obj: any): void {
    this.value = obj;
  }
  onChange = (val:any)=>{};
  registerOnChange(fn: any): void {this.onChange = fn;}
  registerOnTouched(fn: any): void {}

  get isDone():Boolean{
    return true;
  }
  get isError():Boolean{
    return false
  }
  get type():string{
    return this.properties['isPassword'] ? 'password':'text';
  }
  get name():string{
    return this.properties['name'] || '';
  }
  get iconName():string{
    return this.properties['iconName'] || '';
  }
  get iconColor(): string{
    return this.properties['iconColor'] || '';
  }
  get isTitle():Boolean{
    return this.properties['isTitle'] == undefined ? true : this.properties['isTitle'];
  }
}
