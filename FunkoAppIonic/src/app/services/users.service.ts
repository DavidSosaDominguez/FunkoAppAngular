import {inject, Injectable} from '@angular/core';
import {doc, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {AppUser, FirestoreUser} from '../interfaces/user';
import {StorageService} from './storage.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private firestore = inject(Firestore);
  private storageService = inject(StorageService);

  async addUser(user: AppUser, uid:string) {
    let downloadURL: string;
    if(user.picture) {
      downloadURL = await this.storageService.uploadPicture(user.picture, uid);
    }else {
      downloadURL = await this.storageService.getDefaultPicture();
    }

    const firestoreUser: FirestoreUser = {
      uid,
      name: user.name,
      surname: user.surname,
      email: user.email,
      pictureURL: downloadURL
    }

    const userDoc = doc(this.firestore, `users/${uid}`);
    return await setDoc(userDoc, firestoreUser);
  }

  async getUser(uid: string) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    const snapshot = await getDoc(userDoc);

    return snapshot.exists() ? snapshot.data() as FirestoreUser : null;
  }

  async updateUser(uid: string, name: string, surname: string, newFile?: File) {
    const userDoc = doc(this.firestore, `users/${uid}`);
    const snapshot = await getDoc(userDoc);

    if (!snapshot.exists()) throw new Error('Usuario no encontrado');

    const userData = snapshot.data() as FirestoreUser;

    let pictureURL: string = userData.pictureURL;
    if(newFile) {
      pictureURL = await this.storageService.uploadPicture(newFile, uid);
    }

    return await setDoc(userDoc, {
        ...userData,
        name,
        surname,
        pictureURL
    });
  }
}
