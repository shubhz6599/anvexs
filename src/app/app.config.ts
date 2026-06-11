// File: app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { encryptionInterceptor } from './core/interceptors/encryption.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // withViewTransitions({ skipInitialTransition: false }),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),

      // withScrollRestoration('enabled')
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor,
        authInterceptor,
        // encryptionInterceptor,
        errorInterceptor,
      ])
    ),
    // provideAnimationsAsync(),
  ],
};
