import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  // urlApi: string= 'https://fakestoreapi.com';
   private urlApi = `${environment.API_URL}/api/v1/products/`;
  //  private urlApi = 'https://api.escuelaaajs.co';
  // urlApi: string= 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private _http: HttpClient) {}


  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this._http.get<Product[]>(`${this.urlApi}`, { params })
    .pipe(
      retry(3)
    );
  }

  getProdut(id: number) {
    return this._http.get<Product>(`${this.urlApi}${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) =>{
        if(error.status === HttpStatusCode.Conflict) {
          return throwError('Something this is fatal in the server')
        }
        if(error.status === HttpStatusCode.NotFound) {
          return throwError('The product don`t exitis ')
        }
        if(error.status === HttpStatusCode.Unauthorized) {
          return throwError('Permission Denegate')
        }
        return throwError('Ups something fatal')
      })
    );
  }

  getProductsByPage(limit: number, offset: number) {
    return this._http.get<Product[]>(`${this.urlApi}`, {
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(`${this.urlApi}`, dto);
  }

  update(id: number, dto: UpdateProductDTO) {
    return this._http.put<Product>(`${this.urlApi}${id}`, dto)
  }

  delete(id: number) {
    return this._http.delete<boolean>(`${this.urlApi}${id}`)
  }
}
