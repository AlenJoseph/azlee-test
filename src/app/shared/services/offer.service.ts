import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private http: HttpClient) {}

  // Call api to get all Offers
  getOffers(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/offer').pipe(
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
  createOffer(
    description: string,
    offer_code: string,
    offer_amount: string,
    percentage: string,
    shop_id: string,
    product_id: string,
    from_date: string,
    to_date: string,
    image: string
  ): Observable<boolean> {
    return this.http
      .post<any>(environment.baseURL + 'admin/offer', {
        image,
        description,
        offer_code,
        offer_amount,
        percentage,
        shop_id,
        product_id,
        from_date,
        to_date
      })
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
  deleteOffer(offerId: string): Observable<boolean> {
    return this.http
      .delete<any>(environment.baseURL + `admin/offer?id=${offerId}`)
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
