import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { checkToken } from '../interceptors/time-interceptor';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // urlApi: string= 'https://fakestoreapi.com';
  private urlApi = `${environment.API_URL}/api/v1`;
  //  private urlApi = 'https://api.escuelaaajs.co';
  // urlApi: string= 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private _http: HttpClient) {}

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit).set('offset', offset);
  }
  return this._http.get<Product[]>(`${this.urlApi}/categories/${categoryId}/products`, { params })
}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit).set('offset', offset);
    }
    // if(limit && offset) {
    //   params = params.set('limit', limit);
    //   params = params.set('offset', offset);
    // }

    return this._http.get<Product[]>(`${this.urlApi}/products/`, { params, context: checkToken() }).pipe(
      retry(3),
      map((product) =>
        product.map((item) => ({
          ...item,
          taxes: item.price * 0.19,
        })),
      ),
    );
  }

  getOne(id: number) {
    return this._http.get<Product>(`${this.urlApi}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ups, something went wrong';

        switch (error.status) {
          case HttpStatusCode.Conflict:
            message = 'Critical server error';
            break;
          case HttpStatusCode.NotFound:
            message = 'The product does not exit';
            break;
          case HttpStatusCode.Unauthorized:
            message = 'Permission denied';
            break;
        }
        return throwError(() => new Error(message));
      }),
    );
  }

  getProdut(id: number) {
    return this._http.get<Product>(`${this.urlApi}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Ups, something went wrong';

        switch (error.status) {
          case HttpStatusCode.Conflict:
            message = 'Critical server error';
            break;
          case HttpStatusCode.NotFound:
            message = 'The product does not exit';
            break;
          case HttpStatusCode.Unauthorized:
            message = 'Permission denied';
            break;
        }
        return throwError(() => new Error(message));
        // if (error.status === HttpStatusCode.Conflict) {
        //   return throwError('Something this is fatal in the server');
        // }
        // if (error.status === HttpStatusCode.NotFound) {
        //   return throwError('The product don`t exitis ');
        // }
        // if (error.status === HttpStatusCode.Unauthorized) {
        //   return throwError('Permission Denegate');
        // }
        // return throwError('Ups something fatal');
      }),
    );
  }

  //Callback Hell
  fetchReadAndUpdate(id: number, dto: UpdateProductDTO) {
    return zip(this.getProdut(id), this.update(id, dto));
  }

  getProductsByPage(limit: number, offset: number) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    return this._http.get<Product[]>(`${this.urlApi}/products/`, { params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => ({
          ...item,
          taxes: item.price * 0.19, // 👈 Agrega esto aquí también
        })),
      ),
    );
    // return this._http.get<Product[]>(`${this.urlApi}`, {
    //   params: { limit, offset }
    // });
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(`${this.urlApi}/products/`, dto);
  }

  update(id: number, dto: UpdateProductDTO) {
    return this._http.put<Product>(`${this.urlApi}/products/${id}`, dto);
  }

  delete(id: number) {
    return this._http.delete<boolean>(`${this.urlApi}/products/${id}`);
  }
}
