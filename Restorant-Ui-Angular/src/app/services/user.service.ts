import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { RestorantApis} from './restorant.apis';
import jwt_decode from 'jwt-decode'
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }
  login(credentials: {username:string,password:string}){
    // this.token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MTk5MTRlYWM4ZjE2Zjc5MWY2MWFiYjUiLCJwYXlsb2FkIjp7InVzZXJUeXBlIjoiQ0xJRU5UIiwidXNlcm5hbWUiOiJuZGFiYSIsImVtYWlsIjoiamVhbkBib3NjbyJ9LCJpc3MiOiJZYWRsaW5ncyIsImV4cCI6MTYzODA1MzkzMiwiaWF0IjoxNjM4MDUzOTMyfQ.X9m6iRI3B23Gr9b0w-wIxHX7JVYKMd3zWeWZIquaXJc"
    // this.router.navigate(['/'])
    let formCredentials = `username=${credentials.username}&password=${credentials.password}`
    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
    this.http
    .post<{Token:string}>(RestorantApis.USER_LOGIN,formCredentials,{headers:httpHeaders})
    .subscribe({
      next: response=> {
        this.token = response.Token;
        this.router.navigate(['/']);
      },
      error: response=> console.error(response)
    })
  }
  register(user : User&{password:string}):Observable<HttpResponse<any>>{
    // console.log(user);
    return this.http.post<HttpResponse<any>>(RestorantApis.REGISTER_CLIENT,user,{observe:'response'});
  }
  update(){

  }
  logout(){
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_info");
    this.router.navigate(['category']);
  }
  set token(_token:string){
    localStorage.setItem("user_token",_token);
    localStorage.setItem("user_info",JSON.stringify(jwt_decode(_token)));
  }
  get token():string{
    return localStorage.getItem("user_token") || '';
  }
  get userInfo():Token{    
    return JSON.parse(localStorage.getItem("user_info")||"{\"noToken\":\"true\"}");
  }
  get isLoggedIn():boolean{
    //check if there is token
    //and if it is not expired
    let tokenExpiration =  this.userInfo.exp || 0;
    //There nee to be a change on serve exp date
    return  tokenExpiration < new Date().getTime() && tokenExpiration > 0;
  }

  get username():string{
    return this.userInfo.sub ||'';
  }



}

