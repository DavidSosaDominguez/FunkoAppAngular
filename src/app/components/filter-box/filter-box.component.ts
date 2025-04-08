// src/app/components/filter-box/filter-box.component.ts
import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
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

  constructor(private filterService: FilterService) {}

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

  // ✅ Aplicar los filtros solo al hacer clic
  applyFilters(): void {
    this.filterService.applyFilters(
      this.priceValue,
      Array.from(this.selectedCategories)
    );
  }
}
