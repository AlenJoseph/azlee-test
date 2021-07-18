import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  constructor(private http: HttpClient) {}

  // Call api to get all drivers
  getdrivers(): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/delivery-partners/')
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetdriversError.bind(this))
      );
  }

  _handleGetdriversError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to promote shop
  verifyDriver(shopId: any): Observable<boolean> {
    return this.http
      .put<any>(environment.baseURL + 'admin/delivery-partners/verify', {
        id: shopId
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleActivateDriverError.bind(this))
      );
  }

  _handleActivateDriverError(error: Error) {
    return throwError('Failed to verify driver.');
  }

  // Call api to get driver details
  getDriverDetails(id): Observable<boolean> {
    return this.http
      .get<any>(
        environment.baseURL +
          'admin/dashboard/wallet_info?deliver_partner_id=' +
          id
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetdriversDetailError.bind(this))
      );
  }

  _handleGetdriversDetailError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to update wallet
  walletUpdate(amount, id, note): Observable<boolean> {
    return this.http
      .put<any>(
        environment.baseURL +
          'admin/dashboard/update_wallet?amount=' +
          amount +
          '&deliver_partner_id=' +
          id +
          '&notes=' +
          note,
        {}
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleWalletUpdateError.bind(this))
      );
  }

  _handleWalletUpdateError(error: Error) {
    return throwError('Failed to update wallet.');
  }
}
