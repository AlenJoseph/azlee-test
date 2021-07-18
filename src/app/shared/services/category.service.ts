import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  
  // Call api to get all categories
  getCategories(): Observable<boolean> {
    return this.http.get<any>(environment.baseURL + 'admin/categories').pipe(
      map((response) => {
        return response;
      }),
      catchError(this._handleGetCategoriesError.bind(this))
    );
  }

  _handleGetCategoriesError(error: Error) {
    return throwError('Failed to get category list.');
  }

  // Call api to create a category
  createCategory(
    name: string,
    description: string,
    image: string
  ): Observable<boolean> {
    return this.http
      .post<any>(environment.baseURL + 'admin/categories/', {
        name,
        image,
        description,
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this._handleCreateCategoriesError.bind(this))
      );
  }

  _handleCreateCategoriesError(error: Error) {
    return throwError('Failed to create category.');
  }

  // Call api to delete a category
  deleteCategory(categoryId: string): Observable<boolean> {
    return this.http
      .delete<any>(environment.baseURL + `admin/categories?id=${categoryId}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError(this._handleDeleteCategoriesError.bind(this))
      );
  }

  _handleDeleteCategoriesError(error: Error) {
    return throwError('Failed to delete category.');
  }
}
