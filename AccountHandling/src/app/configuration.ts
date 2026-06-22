import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authorizationInterceptor} from './core/interceptor/authorization.interceptor';

export const configuration: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authorizationInterceptor
      ])
    )
  ]
};
