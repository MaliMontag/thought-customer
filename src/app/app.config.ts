import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpRequestInterceptor } from './HttpRequestInterceptor';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {
  provideHttpClient, withFetch,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),
      withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }

  ]
};