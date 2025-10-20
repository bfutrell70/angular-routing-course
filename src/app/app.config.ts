import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(
      ROUTES,
      withComponentInputBinding(),
      // this preloads lazy-loaded module bundles after the main bundle is downloaded
      withPreloading(PreloadAllModules),
    ),
  ]
};


