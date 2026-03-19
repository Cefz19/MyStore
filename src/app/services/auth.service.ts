import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';

import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi = `${environment.API_URL}/api/v1/auth`;
  private user = new BehaviorSubject<User | null>(null);

  user$ = this.user.asObservable();

  constructor(
    private _http: HttpClient,
    private tokenService: TokenService,
  ) {}

  login(email: string, password: string) {
    return this._http.post<Auth>(`${this.urlApi}/login`, {
      email,
      password,
    })
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  //token: string ya no hace falta en el profile por que ya se obtine desde tap desde el login que lo guarda en el localStorage
  getProfile() {
    //Esta es de forma dinamica
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);

    return this._http.get<User>(`${this.urlApi}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type': 'application/json'
      // },
    })
    .pipe(
      tap(user =>  this.user.next(user))
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }
  logout() {
    this.tokenService.removeToken();
  }
}
