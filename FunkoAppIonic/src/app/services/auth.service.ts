import { Injectable, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import {catchError, from, map, Observable, Subscription, throwError} from 'rxjs';
import { authState } from 'rxfire/auth';
import { AppUser } from '../interfaces/user';
import { UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy{
  user$: Observable<User | null>;
  currentUid: string |null = null;
  private uidSub?: Subscription;
  private auth = inject(Auth);
  private userService = inject(UsersService);

  constructor() {
    this.user$ = authState(this.auth);
    this.uidSub = this.user$.subscribe(user => {
      this.currentUid = user ? user.uid : null;
    })
  }

  async register(email: string, password: string, name: string, surname: string, picture: File | null): Promise<User> {
    try {
      const cred = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = cred.user.uid;

      const dbUser: AppUser = {
        email,
        name,
        surname,
        picture: picture
      };

      await this.userService.addUser(dbUser, uid);
      return cred.user;
    } catch (error: any) {
      console.error('Firebase registration error:', error);
      throw {
        code: error.code,
        message: this.getFriendlyRegisterErrorMessage(error)
      };
    }
  }

  private getFriendlyRegisterErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso';
      case 'auth/invalid-email':
        return 'Correo electrónico inválido';
      case 'auth/operation-not-allowed':
        return 'Operación no permitida';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil';
      default:
        return 'Error durante el registro. Por favor, inténtalo de nuevo.';
    }
  }


  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
        map(cred => cred.user),
        catchError(error => {
          console.error('Firebase auth error:', error);
          // Convertimos el error a un objeto que podamos manejar mejor
          const authError = {
            code: error.code,
            message: this.getFriendlyErrorMessage(error)
          };
          return throwError(() => authError); // Re-lanzamos el error modificado
        })
    );
  }

  private getFriendlyErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        return 'Correo electrónico o contraseña incorrectos';
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Por favor, inténtalo más tarde';
      default:
        return 'Error al iniciar sesión. Por favor, inténtalo de nuevo';
    }
  }

  logout() {
    return from(signOut(this.auth));
  }

  async getCurrentFirestoreUser() {
    if(!this.currentUid) return null;
    return await this.userService.getUser(this.currentUid);
  }

  async updateCurrentUser(name: string, surname:string, picture?: File) {
    if(!this.currentUid) return null;
    return await this.userService.updateUser(this.currentUid, name, surname, picture);
  }

  ngOnDestroy() {
    this.uidSub?.unsubscribe();
  }
}
