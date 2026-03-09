import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Category } from '../models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  private urlApi = `${environment.API_URL}/api/v1/categories`;
  
  _http = inject(HttpClient);

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams()
    if(limit && offset) {
      params = params.set('limit', limit)
      params = params.set('offset', offset) 
    }
    return this._http.get<Category[]>(this.urlApi, { params })
  }
}
