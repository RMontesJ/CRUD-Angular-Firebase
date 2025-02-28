import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@envs/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "angular-18-crud-54fa0", appId: "1:63258248236:web:28c7262b577418fc073d89", storageBucket: "angular-18-crud-54fa0.firebasestorage.app", apiKey: "AIzaSyAV1fg_6A-UcboK9NwPmpLbhKx90mfnG5Y", authDomain: "angular-18-crud-54fa0.firebaseapp.com", messagingSenderId: "63258248236" },environment.firebase)), provideFirestore(() => getFirestore())]
};
