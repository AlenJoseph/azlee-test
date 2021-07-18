import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { loginData, userData } from '../models/login-data.model';
import { CookieService } from '../services/cookie.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  WRONG_PASSWORD_ERROR: string = 'Incorrect username or password.';

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(environment.baseURL + 'admin/auth/login', {email: username, password})
      .pipe(
        map((response) => {

          // Check whether auth successful
          if(response.success){
            // set cookie and navigate to admin page
            this.cookieService.setCookie("authToken", response.token)
          }else{
            throw new Error(this.WRONG_PASSWORD_ERROR);
          }
        }),
        catchError(this._handleLoginError.bind(this))
      );
  }

  _handleLoginError(error: Error) {
    if (error.message == this.WRONG_PASSWORD_ERROR) {
      return throwError(this.WRONG_PASSWORD_ERROR);
    } else {
      return throwError('Failed to login. Try again later.');
    }
  }

  getUserData(): userData {
    return localStorage.hasOwnProperty('userData')
      ? JSON.parse(localStorage.getItem('userData'))
      : null;
  }
}
