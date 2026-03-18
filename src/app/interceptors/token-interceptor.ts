import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const token = tokenService.getToken();

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  if(token) {
    const authReq = req.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    });
    return next(authReq)
  }

  return next(req);
};


// function addToken(req: HttpRequest<unknown>, next: HttpHandlerFn, tokenService: TokenService) {
//   const token = tokenService.getToken();
//   if(token) {
//     const authReq = req.clone({
//       setHeaders: {Authorization: `Bearer ${token}`}
//     });
//     return next(authReq)
//   }
//   return next(req);
// }
