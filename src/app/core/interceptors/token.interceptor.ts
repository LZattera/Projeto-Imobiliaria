import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.auth.token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        }
      })
    }
    return next.handle(request);
  }
}
