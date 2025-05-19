import {inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  user
} from '@angular/fire/auth';
import {from, Observable, of, switchMap} from 'rxjs';
import {UsersService} from './users.service';
import {DataBaseUser} from '../interfaces/user';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSign = signal<DataBaseUser|null|undefined>(undefined);
  usersService = inject(UsersService);

  register(name:string, surname: string, email: string, password: string, picture: string): Observable<void> {
    return from(this.registerUser(name, surname, email, password, picture));
  }

  async registerUser(name: string, surname: string, email: string, password: string, picture: string) {
    try {
      const response = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);

      await updateProfile(response.user, {displayName: name});

      const user: DataBaseUser = {
        email: email,
        name: name,
        surname: surname,
        picture: picture
      };

      await this.usersService.addUser(user);

    } catch (error) {
      console.error('Error durante el registro de usuario:', error);
      throw error;
    }
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth,
      email,
      password).then(()=>{});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.currentUserSign.set(null);
    return from(promise);
  }

  getCurrentDbUser() {
    return this.user$.pipe(
      switchMap(user => {
       if (user) {
         return this.usersService.getUser(user.email!);
       }else {
         return of(null);
        }
      })
    )
  }

  constructor() {
    this.getCurrentDbUser().subscribe(user => {
      this.currentUserSign.set(user);
    })
  }
}
