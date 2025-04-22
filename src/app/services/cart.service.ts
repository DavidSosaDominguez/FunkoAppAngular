import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private isCartResumeVisible = new BehaviorSubject<boolean>(true);
  isVisible$ = this.isCartResumeVisible.asObservable();

  toggleVisibility(): void {
    this.isCartResumeVisible.next(!this.isCartResumeVisible.value);

  }
}
