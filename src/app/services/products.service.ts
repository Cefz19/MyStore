import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  urlApi: string= 'https://fakestoreapi.com';
  constructor(private _http: HttpClient) {}


  getAllProducts() : Observable<Product[]> {
    return this._http.get<Product[]>(`${this.urlApi}/products`);
  }
}
