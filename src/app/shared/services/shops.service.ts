import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  // Call api to get all shops
  getShops(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/shops').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetShopsError.bind(this))
    );
  }

  _handleGetShopsError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to get all fazza partners
  getfazzaPartners(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/fazza/partner').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetFazzaPartnersError.bind(this))
    );
  }

  _handleGetFazzaPartnersError(error: Error) {
    return throwError('Failed to get partner list.');
  }

  // Call api to open/close shop
  openCloseShop(shopId: any, status: any): Observable<boolean> {
    return this.http
      .put<any>(environment.baseURL + 'admin/shops/open', {
        id: shopId,
        status: status
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleActivateShopOpenError.bind(this))
      );
  }

  _handleActivateShopOpenError(error: Error) {
    return throwError('Failed to promote shop.');
  }

  // Call api to promote shop
  verifyShop(shopId: any, status: any): Observable<boolean> {
    return this.http
      .put<any>(environment.baseURL + 'admin/shops/verify', {
        id: shopId,
        status: status
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleActivateShopError.bind(this))
      );
  }

  _handleActivateShopError(error: Error) {
    return throwError('Failed to promote shop.');
  }

  // Call api to promote shop
  promoteShop(shopId: any, status: any): Observable<boolean> {
    return this.http
      .put<any>(environment.baseURL + 'admin/shops/promote', {
        id: shopId,
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

  // Call api to get shop details
  getShopDetails(id: any): Observable<boolean> {
    return this.http
      .get<any>(
        environment.baseURL + 'admin/dashboard/wallet_info?shop_id=' + id
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetShopsDetailError.bind(this))
      );
  }

  _handleGetShopsDetailError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to update wallet
  walletUpdate(amount, id, note): Observable<boolean> {
    return this.http
      .put<any>(
        environment.baseURL +
          'admin/dashboard/update_wallet?amount=' +
          amount +
          '&shop_id=' +
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

  // Call api to get shop wallet transaction details
  getShopWalletTransactionDetails(date, id): Observable<boolean> {
    console.log(date);
    console.log(id);
    return this.http
      .get<any>(
        environment.baseURL +
          'admin/shops/transactions?report_type=' +
          date +
          '&id=' +
          id
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetShopWalletTransactionDetailsError.bind(this))
      );
  }

  _handleGetShopWalletTransactionDetailsError(error: Error) {
    return throwError('Failed to get transaction list.');
  }
}
