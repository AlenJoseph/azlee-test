import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private cookie: CookieService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.cookie.getCookie("authToken")

    if(authToken) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization", authToken)
        });

        return next.handle(cloned);
    }
    else {
        return next.handle(req);
    }
  }
}
