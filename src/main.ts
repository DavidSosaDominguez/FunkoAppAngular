import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './environments/firebase-config';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "funkostorepwm113", appId: "1:670912129319:web:b5304d24e168c546efa102", storageBucket: "funkostorepwm113.firebasestorage.app", apiKey: "AIzaSyAmUAjYmfWsAuKx_8bikj30xELCVRqmk58", authDomain: "funkostorepwm113.firebaseapp.com", messagingSenderId: "670912129319", measurementId: "G-MSNEQXDTM8" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error(err));
