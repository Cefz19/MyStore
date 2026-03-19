import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, retry } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    // Si es un 503 (servidor saturado), reintenta 2 veces antes de fallar
    retry({ count: 2, delay: 1000 }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error.status === 401) {
        // Aquí manejas el error específico de login/sesión
        console.warn('Sesión no válida o credenciales incorrectas');
        // Opcional: redirigir al login o limpiar tokens
      }

      if (error.status === 503) {
        // Aquí podrías disparar una alerta visual (Toast o Snackbar)
        console.error('ALERTA 503:', errorMessage);
      }
      errorMessage = error.error?.message || 'Ocurrió un error inesperado';
      return throwError(() => new Error(errorMessage));
    }),
  );
};
