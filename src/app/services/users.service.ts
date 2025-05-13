import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  CollectionReference,
  DocumentReference,
  doc,
  setDoc,
  getDoc, docData
} from '@angular/fire/firestore';
import {DataBaseUser} from '../interfaces/user';
import {user} from '@angular/fire/auth';
import {from, map, Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private firestore: Firestore = inject(Firestore);

  addUser(user: DataBaseUser) {
    const userRef = collection(this.firestore, 'users') as CollectionReference<DataBaseUser>;
    return addDoc(userRef, user);
  }

  getUser(email: string){
    const userRef = doc(this.firestore, `users/${email}`) as DocumentReference<DataBaseUser>;
    return docData(userRef) as Observable<DataBaseUser|null>;
  }
}
