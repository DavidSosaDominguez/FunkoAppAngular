import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';
import { Funko } from '../../funko';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {
  private firestore = inject(Firestore);
  private productsCollection = collection(this.firestore, 'products');

  getAllFunkos(): Observable<Funko[]> {
    return collectionData(this.productsCollection, { idField: 'firebaseId' }) as Observable<Funko[]>;
  }

  getFunkoById(id: number): Observable<Funko | undefined> {
    return this.getAllFunkos().pipe(
      map(funkos => funkos.find(f => f.id === id))
    );
  }

  getFunkosBySeries(series: string): Observable<Funko[]> {
    const q = query(this.productsCollection, where('series', '==', series));
    return collectionData(q) as Observable<Funko[]>;
  }
}
