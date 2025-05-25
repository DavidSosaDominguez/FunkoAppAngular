import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css']
})
export class FilterBoxComponent implements OnDestroy {
  isVisible = false;
  priceValue = 100;

  categories = ['INVINCIBLE', 'LOL', 'STAR WARS', 'HARRY POTTER'];
  selectedCategories = new Set<string>(this.categories);

  showFavoritesOnly = false;    // Nuevo: para el filtro favoritos
  isAuthenticated = false;      // Nuevo: estado autenticación

  private filterService = inject(FilterService);
  private router = inject(Router);
  private authService = inject(AuthService);

  private subscriptions: Subscription[] = [];

  constructor() {
    this.subscriptions.push(
        this.filterService.isVisible$.subscribe(visible => {
          this.isVisible = visible;
        })
    );

    // Escuchar estado autenticación
    this.subscriptions.push(
        this.authService.user$.subscribe(user => {
          this.isAuthenticated = !!user;
        })
    );
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

  onFavoritesToggle(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.showFavoritesOnly = checkbox.checked;
  }

  applyFilters(): void {
    this.filterService.updateFilters({
      maxPrice: this.priceValue,
      categories: Array.from(this.selectedCategories),
      favoritesOnly: this.showFavoritesOnly  // Incluimos el filtro favoritos
    });

    this.router.navigate([''], {
      queryParams: {
        maxPrice: this.priceValue,
        categories: Array.from(this.selectedCategories).join(','),
        favoritesOnly: this.showFavoritesOnly
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
