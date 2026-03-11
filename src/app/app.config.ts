import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { register } from 'swiper/element/bundle';

import { routes } from './app.routes';
import { timeInterceptor } from './interceptors/time-interceptor';
import { tokenInterceptor } from './interceptors/token-interceptor';
import { errorInterceptor } from './interceptors/error.interceptor-interceptor';

register();
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([timeInterceptor, tokenInterceptor, errorInterceptor]),
    ),
  ],
};
