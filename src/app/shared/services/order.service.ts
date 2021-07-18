import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // Call api to get all Orders
  getOrders(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/orders').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetOffersError.bind(this))
    );
  }

  _handleGetOffersError(error: Error) {
    return throwError('Failed to get offer list.');
  }

  // Call api to get customer Details
  getCustomer(id): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/customer/' + id)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetCustomerError.bind(this))
      );
  }

  _handleGetCustomerError(error: Error) {
    return throwError('Failed to get offer list.');
  }

  // Call api to get shop Details
  getShop(id): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/shops/' + id).pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetShopError.bind(this))
    );
  }

  _handleGetShopError(error: Error) {
    return throwError('Failed to get offer list.');
  }

  // Call api to get driver Details
  getDriver(id): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/delivery-partners/' + id)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetDriverError.bind(this))
      );
  }

  _handleGetDriverError(error: Error) {
    return throwError('Failed to get offer list.');
  }

  // Call api to cancel an order
  changeStatus(status, orderId, shopId): Observable<boolean> {
    return this.http
      .put<any>(
        environment.baseURL +
          'admin/orders?order_status=' +
          status +
          '&order_id=' +
          orderId +
          '&shop_id=' +
          shopId,
        {}
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleChangeOrderStatusError.bind(this))
      );
  }

  _handleChangeOrderStatusError(error: Error) {
    return throwError('Failed to change status.');
  }

  // Call api to change driver
  changeDriver(id, driverId): Observable<boolean> {
    return this.http
      .put<any>(
        environment.baseURL +
          'admin/orders/update-driver?order_id=' +
          id +
          '&delivery_partner_id=' +
          driverId,
        {}
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleChangeDriverError.bind(this))
      );
  }

  _handleChangeDriverError(error: Error) {
    return throwError('Failed to change driver.');
  }

  // Call api to get driverList
  getOrderDrivers(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/orders/driver').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleOrderDriversError.bind(this))
    );
  }

  _handleOrderDriversError(error: Error) {
    return throwError('Failed to get drivers list.');
  }
}
