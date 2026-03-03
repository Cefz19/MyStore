import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = `${environment.API_URL}/api/v1/auth`;
  constructor(private _http: HttpClient) {}

  login(email: string, password: string) {
    return this._http.post<Auth>(`${this.urlApi}/login`, {
      email,
      password
    });
  }

  profile() {
    return this._http.get(`${this.urlApi}/login`);
  }

}
