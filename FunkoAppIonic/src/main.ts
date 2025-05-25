import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideIonicAngular } from '@ionic/angular/standalone';
import {firebaseConfig} from "./app/environments/firebase-config"; // ✅ IMPORTAR ESTO

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(), // ✅ NECESARIO PARA QUE FUNCIONE IONIC
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage())
  ]
}).catch(err => console.error(err));
