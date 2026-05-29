import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser'; // Restores SSR Context
import { provideHttpClient, withFetch } from '@angular/common/http'; // Handles HTTP in SSR
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), // <-- This is the missing piece!
    provideHttpClient(withFetch()) // <-- Required for SSR HTTP calls
  ]
};