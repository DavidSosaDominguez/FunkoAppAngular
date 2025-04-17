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

  private isFilterBoxVisible = new BehaviorSubject<boolean>(false);

  isVisible$ = this.isFilterBoxVisible.asObservable();

  updateFilters(newFilters: Partial<Filters>): void {
    const current = this.filtersSubject.value;
    this.filtersSubject.next({ ...current, ...newFilters });
  }

  toggleVisibility(): void {
    this.isFilterBoxVisible.next(!this.isFilterBoxVisible.value);
  }
}
