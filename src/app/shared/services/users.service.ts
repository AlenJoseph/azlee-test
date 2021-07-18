import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  // Call api to get all users
  getusers(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/customer').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetusersError.bind(this))
    );
  }

  _handleGetusersError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to block user
  blockUser(userId: any, status: any): Observable<boolean> {
    return this.http
      .put<any>(environment.baseURL + 'admin/customer/block-or-un-block', {
        id: userId,
        status: status
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handlePromoteShopError.bind(this))
      );
  }

  _handlePromoteShopError(error: Error) {
    return throwError('Failed to promote shop.');
  }
}
