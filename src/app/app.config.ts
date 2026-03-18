import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { CustomPreloadService } from './services/custom-preload.service';
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
    provideRouter(
      routes,
      withPreloading(
        CustomPreloadService,
        // PreloadAllModules
      )
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([timeInterceptor, tokenInterceptor, errorInterceptor]),
    ),
  ],
};
