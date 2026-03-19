import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

// import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  //  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  //  const token = tokenService.getToken();

  //  if(!token) {
  //   router.navigate(['/home']);
  //   return false
  //  }

  return authService.user$
  .pipe(
    map(user => {
      if(!user){
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};
