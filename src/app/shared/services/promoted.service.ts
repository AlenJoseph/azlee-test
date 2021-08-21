import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotedService {
  constructor(private http: HttpClient) {}

  // Call api to get all Offers
  getPromotedItems(): Observable<boolean> {
    return this.http
      .get<any>(environment.baseURL + 'admin/offer/promote-product')
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetOffersError.bind(this))
      );
  }

  _handleGetOffersError(error: Error) {
    return throwError('Failed to get offer list.');
  }

  getShops(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/offer/shops').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetShopsError.bind(this))
    );
  }

  _handleGetShopsError(error: Error) {
    return throwError('Failed to get shop list.');
  }

  getProducts(shopId): Observable<boolean> {
    return this.http
      .get<any>(
        environment.baseURL + 'admin/offer/shop-products?shop_id=' + shopId
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleGetProductsError.bind(this))
      );
  }

  _handleGetProductsError(error: Error) {
    return throwError('Failed to get product list.');
  }

  // Call api to create an offer
  createItem(product_id: string): Observable<boolean> {
    return this.http
      .put<any>(
        environment.baseURL + 'admin/offer/promote-product?id=' + product_id,
        {}
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleCreateoffersError.bind(this))
      );
  }

  _handleCreateoffersError(error: Error) {
    return throwError('Failed to create offer.');
  }

  // Call api to delete an offer
  deleteItem(itemId: string): Observable<boolean> {
    return this.http
      .delete<any>(
        environment.baseURL + `admin/offer/promote-product?id=${itemId}`
      )
      .pipe(
        map(response => {
          return response;
        }),
        catchError(this._handleDeleteCategoriesError.bind(this))
      );
  }

  _handleDeleteCategoriesError(error: Error) {
    return throwError('Failed to delete offer.');
  }
}
