import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateProductDTO, Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  // urlApi: string= 'https://fakestoreapi.com';
   private urlApi = 'https://api.escuelajs.co';
  // urlApi: string= 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(private _http: HttpClient) {}


  getAllProducts() : Observable<Product[]> {
    return this._http.get<Product[]>(`${this.urlApi}/api/v1/products`);
  }

  getProdut(id: number) {
    return this._http.get<Product>(`${this.urlApi}/api/v1/products/${id}`);
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(`${this.urlApi}/api/v1/products`, dto);
  }
}
