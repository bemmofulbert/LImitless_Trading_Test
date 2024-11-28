import {
  ApplicationConfig,
  provideZoneChangeDetection,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.production';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        // onLoad: 'login-required',
        onLoad: 'check-sso',
        checkLoginIframe: false,
      },
      loadUserProfileAtStartUp: true,
    });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAppInitializer(() => initializeKeycloak(inject(KeycloakService))()),
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
  ],
};
