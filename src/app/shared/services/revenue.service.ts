import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {
  constructor(private http: HttpClient) {}

  // Call api to get all categories
  getPaymentInfo(): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/dashboard/payment_info')
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetPaymentInfoError.bind(this))
      );
  }

  _handleGetPaymentInfoError(error: Error) {
    return throwError('Failed to get payment info.');
  }

  getWalletInfo(): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/dashboard/wallet_info')
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetWalletInfoError.bind(this))
      );
  }

  _handleGetWalletInfoError(error: Error) {
    return throwError('Failed to get wallet info.');
  }
}
