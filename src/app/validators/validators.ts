import { AbstractControl } from "@angular/forms";
import { logger } from "../common/utils";

const inputTextValidator = (control:AbstractControl):{[key:string]:Boolean}|null =>
   control.value ? null : {reuired:true};
export{
    inputTextValidator,
}