import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules, TitleStrategy } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import { SeoTitleStrategy } from './core/seo/seo-title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    { provide: LOCALE_ID, useValue: 'fr-FR' }]
};
