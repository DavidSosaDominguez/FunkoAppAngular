import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent {
  isVisible = false;
  priceValue = 100;

  categories = ['INVINCIBLE', 'LOL', 'STAR WARS', 'HARRY POTTER'];
  selectedCategories = new Set<string>(this.categories);

  private filterService = inject(FilterService);
  private router = inject(Router);

  constructor() {
    this.filterService.isVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  onPriceChange(event: Event): void {
    this.priceValue = Number((event.target as HTMLInputElement).value);
  }

  onCheckboxChange(event: Event, category: string): void {
    const checkbox = event.target as HTMLInputElement;
    checkbox.checked
      ? this.selectedCategories.add(category)
      : this.selectedCategories.delete(category);
  }

  applyFilters(): void {
    this.filterService.updateFilters({
      maxPrice: this.priceValue,
      categories: Array.from(this.selectedCategories)
    });

    this.router.navigate([''], {
      queryParams: {
        price: this.priceValue,
        categories: Array.from(this.selectedCategories).join(',')
      }
    });
  }
}
