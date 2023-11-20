import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    ScreenTrackingService,
    UserTrackingService,
  } from '@angular/fire/analytics';

  import { environment } from '../environments/environment';
  import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthenticationService } from './core/services/auth/authentication.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), provideAnimations(),
        importProvidersFrom([
            AngularFireModule.initializeApp(environment.firebase),
          ]),
          ScreenTrackingService,
          UserTrackingService,
          AuthenticationService
    ],
    
};

