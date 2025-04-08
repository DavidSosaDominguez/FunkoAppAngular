// src/app/components/filter-box/filter-box.component.ts
import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-box',
  standalone: true,
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.css'],
  imports: [CommonModule]
})
export class FilterBoxComponent implements OnInit {
  isVisible: boolean = false;
  priceValue: number = 100;

  // ✅ Colecciones seleccionables
  categories = ['INVINCIBLE', 'LOL', 'STAR WARS', 'HARRY POTTER'];
  selectedCategories: Set<string> = new Set(this.categories); // Seleccionados por defecto

  constructor(
    private filterService: FilterService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.filterService.isVisible$.subscribe((visible) => {
      this.isVisible = visible;
    });
  }

  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.priceValue = Number(input.value);
  }

  onCheckboxChange(event: Event, category: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
  }

  applyFilters(): void {
    // Aplica los filtros en el servicio
    this.filterService.applyFilters(
      this.priceValue,
      Array.from(this.selectedCategories)
    );

    // Redirige a la página principal ('/') con los filtros como parámetros de consulta
    this.router.navigate([''], {
      queryParams: {
        price: this.priceValue,
        categories: Array.from(this.selectedCategories).join(',')
      }
    });
  }
}
