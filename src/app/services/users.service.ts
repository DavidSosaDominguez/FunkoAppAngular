import {inject, Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  CollectionReference,
  DocumentReference,
  doc,
  docData, query, where, getDocs
} from '@angular/fire/firestore';
import {DataBaseUser} from '../interfaces/user';
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
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email' ,'==', email));

    return from(getDocs(q)).pipe(
      map(snapshot => {
        if(snapshot.empty) {
          return null;
        }else {
          const data = snapshot.docs[0].data();
          return data as DataBaseUser;
        }
      })
    )
  }
}
