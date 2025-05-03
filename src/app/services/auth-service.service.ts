import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  user
} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import {User} from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  firebaseAtuh = inject(Auth);
  user$ = user(this.firebaseAtuh);
  currentUserSign = signal<User|null|undefined>(undefined);

  register(name: string, surname: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAtuh,
      email,
      password).then(response=>{
        updateProfile(response.user, {displayName: name});
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAtuh,
      email,
      password).then(()=>{});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAtuh);
    this.currentUserSign.set(null);
    return from(promise);
  }
}
