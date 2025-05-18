import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() =>
    initializeApp({
      apiKey: "AIzaSyA88b8I5Acvknp03vdFWSZfYb-O0Fbi0xA",
      authDomain: "vegetableandfruitshop-9cafe.firebaseapp.com",
      projectId: "vegetableandfruitshop-9cafe",
      storageBucket: "vegetableandfruitshop-9cafe.firebasestorage.app",
      messagingSenderId: "671313773672",
      appId: "1:671313773672:web:bca5ff5299f8005bf367dd",
      measurementId: "G-6B30DG12C8"
    })),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  ]
}