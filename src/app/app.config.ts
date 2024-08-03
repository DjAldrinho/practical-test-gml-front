import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
  provideAppCheck,
} from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'practical-test-gml',
        appId: '1:745535521305:web:90df3c8ba16132c3ffa088',
        storageBucket: 'practical-test-gml.appspot.com',
        apiKey: 'AIzaSyDmF0ujG_7h6SKZMKAbvSiQOtVs1OBjAS4',
        authDomain: 'practical-test-gml.firebaseapp.com',
        messagingSenderId: '745535521305',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'practical-test-gml',
        appId: '1:745535521305:web:90df3c8ba16132c3ffa088',
        storageBucket: 'practical-test-gml.appspot.com',
        apiKey: 'AIzaSyDmF0ujG_7h6SKZMKAbvSiQOtVs1OBjAS4',
        authDomain: 'practical-test-gml.firebaseapp.com',
        messagingSenderId: '745535521305',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
