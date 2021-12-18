import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { logger } from 'src/app/common/utils';

interface CustomInputProps{
  name:string;
  iconName? :string;
  hasTitle?: Boolean;
  type?: string;
  invalid?:Boolean;
}
@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(()=>CustomInputComponent),multi:true}]
})
class CustomInputComponent implements ControlValueAccessor{
  @Input('properties') properties: CustomInputProps = {
    name: ''
  }
  _value: string;
  constructor() { 
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
  get color():string{
    return this.properties.invalid ? 'warn': 'primary';
  }
  get icon():string|undefined{
    return this.properties.invalid ? 'error' : this.properties.iconName;
  }
}

export{
  CustomInputComponent,
  CustomInputProps
}