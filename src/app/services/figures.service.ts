import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  query,
  where, doc,
  updateDoc,
  setDoc,
  docData
} from '@angular/fire/firestore';
import {firstValueFrom, map, Observable} from 'rxjs';
import { Funko } from '../interfaces/funko';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BuyErrorComponent} from '../components/buy-error/buy-error.component';

@Injectable({
  providedIn: 'root'
})
export class FiguresService {
  private firestore = inject(Firestore);
  modalService = inject(NgbModal);

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

  updateFunko(funko: Funko) {
    const funkoRef = doc(this.firestore, `products/${funko.id}`);
    return setDoc(funkoRef, funko);
  }

  async modifyQuantity(funko: Funko) {
    const funkoRef = doc(this.firestore, `products/${funko.id}`);
    const current = await firstValueFrom(docData(funkoRef, { idField: 'id' }) as Observable<Funko>);

    const newQty = current.quantity! - funko.quantity!;
    if (newQty < 0) {
      this.modalService.open(BuyErrorComponent, {
        size: 'lg',
        centered: true,
      })
      return;
    }

    return updateDoc(funkoRef, { quantity: newQty });

  }
}
