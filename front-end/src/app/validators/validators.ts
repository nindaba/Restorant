import { AbstractControl } from "@angular/forms";

export function inputTextValidator(control:AbstractControl):{[key:string]:Boolean}|null{
    control.value ? null : {reuired:true};
    return null;
}