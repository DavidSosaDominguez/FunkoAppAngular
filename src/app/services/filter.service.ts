import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FilterData {
  maxPrice: number;
  categories: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filters = new BehaviorSubject<FilterData>({
    maxPrice: 100,
    categories: []
  });

  filters$ = this.filters.asObservable();
  constructor() {}

  applyFilters(maxPrice: number, categories: string[]): void {
    this.filters.next({
      maxPrice,
      categories
    });
  }

  private visibility = new BehaviorSubject<boolean>(false);
  isVisible$ = this.visibility.asObservable();

  toggleVisibility(): void {
    this.visibility.next(!this.visibility.value);
  }
}
