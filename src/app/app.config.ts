// ============================================
// src/app/app.config.ts
// ============================================

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp, initializeApp as initializeAngularFireApp } from '@angular/fire/app';
import { provideAuth , getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import 'zone.js';

// config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBueUQbRTfiBUL0cbtzDSO4KUDt8crRvJ0",
  authDomain: "gestion-ecurie-1.firebaseapp.com",
  databaseURL: "https://gestion-ecurie-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gestion-ecurie-1",
  storageBucket: "gestion-ecurie-1.firebasestorage.app",
  messagingSenderId: "474806643513",
  appId: "1:474806643513:web:82ff070511dfe536f6d6e8"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    provideFirebaseApp(() => initializeAngularFireApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore('gestion-ecurie-1')),
  ],
};
