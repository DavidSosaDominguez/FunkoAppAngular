import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Filters {
  maxPrice: number;
  categories: string[];
  favoritesOnly?: boolean;   // Opcional, porque puede no estar presente
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<Filters>({
    maxPrice: 100,
    categories: ['INVINCIBLE', 'LOL', 'STAR WARS', 'HARRY POTTER'],
    favoritesOnly: false   // Valor inicial por defecto: no filtrar por favoritos
  });

  private isFilterBoxVisible = new BehaviorSubject<boolean>(false);

  isVisible$ = this.isFilterBoxVisible.asObservable();

  updateFilters(newFilters: Partial<Filters>): void {
    const current = this.filtersSubject.value;

    // Si no viene favoritesOnly en newFilters, no se sobreescribe para mantener estado previo
    const updatedFilters: Filters = {
      ...current,
      ...newFilters
    };

    // Garantizamos que favoritesOnly sea booleano o false si undefined
    if (updatedFilters.favoritesOnly === undefined) {
      updatedFilters.favoritesOnly = false;
    }

    this.filtersSubject.next(updatedFilters);
  }

  toggleVisibility(): void {
    this.isFilterBoxVisible.next(!this.isFilterBoxVisible.value);
  }

  // Puedes agregar un getter para obtener los filtros actuales
  getFilters() {
    return this.filtersSubject.value;
  }
}
