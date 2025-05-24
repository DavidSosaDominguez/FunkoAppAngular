import { Injectable, OnDestroy } from '@angular/core';
import { inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User, signOut } from '@angular/fire/auth';
import {from, map, Observable, Subscription} from 'rxjs';
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

  async register(email: string, password: string, name: string, surname: string, picture: File | null) {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);

    const uid = cred.user.uid;

    const dbUser: AppUser = {
      email,
      name,
      surname,
      picture: picture
    }

    await this.userService.addUser(dbUser, uid);

    return cred.user;
  }


  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map(cred => cred.user)
    );
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
