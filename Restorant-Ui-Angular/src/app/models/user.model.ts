export interface User{
    userId?:string;
    name:string;
    username:string;
    email:string;
    password?:string;
    type?:string;
    accountLocked?:Boolean;
}