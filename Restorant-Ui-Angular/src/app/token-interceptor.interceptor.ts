import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService:UserService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.isLoggedIn ? next.handle(request.clone({
      setHeaders:{
        'Authorization':'bearer '+this.userService.token
      }
    })) : next.handle(request);
  }
}
