import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore, CollectionReference} from '@angular/fire/firestore';
import {DataBaseUser} from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private firestore: Firestore = inject(Firestore);

  addUser(user: DataBaseUser) {
    const userRef = collection(this.firestore, 'users') as CollectionReference<DataBaseUser>;
    return addDoc(userRef, user);
  }
}
