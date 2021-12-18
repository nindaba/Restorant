import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { RestorantApis} from '../common/restorant.apis';
import jwt_decode from 'jwt-decode'
import { Observable, of } from 'rxjs';
import { Token } from '../models/token.model';
import { Order } from '../models/order.model';
import {EventSourcePolyfill} from 'ng-event-source'
import { catchError, map, take, tap } from 'rxjs/operators';
import { Response } from '../models/response.module';
import * as Messages from '../common/responses.messages';
import { logger, TapLogger } from '../common/utils';
import { UserDetails } from '../models/user-details.model';
import { InitialModels } from '../common/initial-models.data';
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
      .pipe(take(1))
      .pipe(
        map(response=>{
        this.token = response.headers.get("Authorization")||'';
        return Messages.LOGIN_SUCCESS.response;
        }),
        catchError(() => [Messages.LOGIN_FAILED('err').response]),
      );
  }
  register(user : User&{password:string}):Observable<Response>{
    return this.http
    .post<any>(RestorantApis.REGISTER_CLIENT,user,{observe:'response'})
    .pipe(
      map(response=> Messages.REGISTER_SUCCESS.response),
      catchError(error => [
        Messages.REGISTER_FAILED(error.error.message).response,
      ]),
      TapLogger
    );
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
    return JSON.parse(localStorage.getItem("user_info")||'{}') || InitialModels.INITIAL_TOKEN;
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
  bgetUserDetails(id:string):Observable<UserDetails>{
    return this.http.get<UserDetails>(RestorantApis.USER(id))
  }
  get isEmployee():Boolean{
    return this.userInfo.payload?.userType =='EMPLOYEE' || false;
  }
}

