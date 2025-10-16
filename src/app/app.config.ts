import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // works, requires an array of routes
    // routes are defined in app.routes.ts file
    provideRouter(ROUTES)
  ]
};


