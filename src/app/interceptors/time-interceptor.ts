import { HttpInterceptorFn, HttpContext, HttpContextToken } from '@angular/common/http';
import { tap } from 'rxjs';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

export const timeInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TOKEN)) {
    const start = performance.now();

    return next(req).pipe(
      tap(() => {
        const duration = (performance.now() - start).toFixed(2) + 'ms';
        console.log(`🚀 [${req.method}] ${req.url} - ${duration}`);
      }),
    );
  }
  return next(req);
};
