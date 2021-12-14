import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { RestorantApis} from '../common-data/restorant.apis';
import jwt_decode from 'jwt-decode'
import { Observable, of } from 'rxjs';
import { Token } from '../models/token.model';
import { Order } from '../models/order.model';
import {EventSourcePolyfill} from 'ng-event-source'
import { catchError, map } from 'rxjs/operators';
import { Response } from '../models/response.module';
import { LOGIN_FAILED, LOGIN_SUCCESS } from '../common-data/responses.messages';
import { logger } from '../common-data/utils';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient,private router:Router) { }
  login(credentials: {username:string,password:string}):Observable<Response>{
    let formCredentials = `username=${credentials.username}&password=${credentials.password}`
    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
      return this.http
      .post(RestorantApis.USER_LOGIN,formCredentials,{headers:httpHeaders,observe:'response'})
      .pipe(
        map(response=>{
        this.token = response.headers.get("Authorization")||'';
        return LOGIN_SUCCESS.response;
        }),
        catchError(() => [LOGIN_FAILED('err').response])
      );
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
  load(){
    // let ordersEvent = new EventSourcePolyfill(RestorantApis.CATEGORY);
    // ordersEvent.addEventListener('message' ,event =>  console.log(event));
  }
}

