import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  // urlApi: string= 'https://fakestoreapi.com';
   private urlApi = 'https://api.escuelajs.co';
  // urlApi: string= 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private _http: HttpClient) {}


  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this._http.get<Product[]>(`${this.urlApi}/api/v1/products`);
  }

  getProdut(id: number) {
    return this._http.get<Product>(`${this.urlApi}/api/v1/products/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this._http.get<Product[]>(`${this.urlApi}/api/v1/products/`, {
      params: { limit, offset }
    });
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(`${this.urlApi}/api/v1/products`, dto);
  }

  update(id: number, dto: UpdateProductDTO) {
    return this._http.put<Product>(`${this.urlApi}/api/v1/products/${id}`, dto)
  }

  delete(id: number) {
    return this._http.delete<boolean>(`${this.urlApi}/api/v1/products/${id}`)
  }
}
