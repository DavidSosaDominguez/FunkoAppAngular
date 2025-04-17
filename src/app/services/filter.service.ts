import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Filters {
  maxPrice: number;
  categories: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<Filters>({
    maxPrice: 100,
    categories: ['INVINCIBLE', 'LOL', 'STAR WARS', 'HARRY POTTER']
  });

  private isVisibleSubject = new BehaviorSubject<boolean>(false);

  filters$ = this.filtersSubject.asObservable();
  isVisible$ = this.isVisibleSubject.asObservable();

  updateFilters(newFilters: Partial<Filters>): void {
    const current = this.filtersSubject.value;
    this.filtersSubject.next({ ...current, ...newFilters });
  }

  getCurrentFilters(): Filters {
    return this.filtersSubject.value;
  }

  toggleVisibility(): void {
    this.isVisibleSubject.next(!this.isVisibleSubject.value);
  }
}
