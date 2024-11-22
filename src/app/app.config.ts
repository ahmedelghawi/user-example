import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingSpinnerInterceptor } from './interceptors/loading-spinner/loading-spinner.interceptor';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { snackbarInterceptor } from './interceptors/snackbar/snackbar.interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideEffects(),
    provideHttpClient(withInterceptors([loadingSpinnerInterceptor, authInterceptor, snackbarInterceptor])),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
