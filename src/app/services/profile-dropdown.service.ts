import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileDropdownService {

  private isDropdownVisible = new BehaviorSubject<boolean>(false);

  isVisible$ = this.isDropdownVisible.asObservable();

  toggleVisibility(): void {
    console.log('Toggling visibility');
    this.isDropdownVisible.next(!this.isDropdownVisible.value); // Cambia el estado de visibilidad
  }


  show(): void {
    this.isDropdownVisible.next(true); // Muestra el dropdown
  }

  hide(): void {
    this.isDropdownVisible.next(false); // Oculta el dropdown
  }
}
