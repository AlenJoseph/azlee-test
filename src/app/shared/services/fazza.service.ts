import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FazzaService {
  constructor(private http: HttpClient) {}

  // Call api to get all categories
  getFazza(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/orders/fazza').pipe(
      map(response => {
        return response;
      }),
      catchError(this._handleGetCategoriesError.bind(this))
    );
  }

  _handleGetCategoriesError(error: Error) {
    return throwError('Failed to get category list.');
  }


}
