import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const timeInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();

  return next(req).pipe(
    tap(() => {
      const duration = (performance.now() - start).toFixed(2) + 'ms';
      console.log(`🚀 [${req.method}] ${req.url} - ${duration}`);
    }),
  );
};
