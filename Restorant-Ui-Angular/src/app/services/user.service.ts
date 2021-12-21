import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { RestorantApis} from '../common/restorant.apis';
import jwt_decode from 'jwt-decode'
import { interval, Observable, zip } from 'rxjs';
import { Token } from '../models/token.model';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { Response } from '../models/response.module';
import * as Messages from '../common/responses.messages';
import { logger, TapLogger } from '../common/utils';
import { InitialModels } from '../common/initial-models.data';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public newEmployee :Array<User> = [];

  constructor(private http:HttpClient,private router:Router) {
  }

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
  register(user : User):Observable<Response>{
    return this.http
    .post<any>(this.isEmployee ? RestorantApis.REGISTER_EMPLOYEE : RestorantApis.REGISTER_CLIENT,
      user,
      {observe:'response'})
    .pipe(
      tap(response=> {
        user.userId = response.headers.get('Location')||undefined;
        if(this.isEmployee) this.newEmployee.push(user);
      }),
      map(response=> Messages.REGISTER_SUCCESS.response),
      catchError(error => [
        Messages.REGISTER_FAILED(error.error.message).response,
      ]),
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
  getUserDetails(id:string):Observable<User>{
    return this.http.get<User>(RestorantApis.USER(id))
  }
  getEmployees():Observable<User[]>{
    return this.http.get<User[]>(RestorantApis.EMPLOYEE_USERS)
    .pipe(
      take(1)
    );

  }
  get isEmployee():Boolean{
    return this.userInfo.payload?.userType =='EMPLOYEE' || false;
  }
}

