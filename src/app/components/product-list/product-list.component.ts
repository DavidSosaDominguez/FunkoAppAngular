import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FiguresService } from '../../../figures.service';
import { FilterService } from '../../services/filter.service';
import { ProductComponent } from '../product/product.component';
import { Funko } from '../../../funko';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  filteredFunkos: Funko[] = [];
  loading = false;
  errorMessage: string | null = null; // Add this if you need error handling

  private funkoService = inject(FiguresService);
  private filterService = inject(FilterService);

  ngOnInit(): void {

    this.loadFilteredProducts();
    this.filterService.filters$.subscribe(() => {
      this.loadFilteredProducts();
    });
  }

  loadFilteredProducts(): void {
    this.loading = true;
    try {
      const allFunkos = this.funkoService.getAllFunkos();
      console.log('All Funkos:', allFunkos);
      const filters = this.filterService.getCurrentFilters();
      console.log('Filters:', filters);

      this.filteredFunkos = allFunkos.filter(funko => {
        const price = Number(funko.price.replace(',', '.'));
        console.log('Price parsed:', Number(funko.price.replace(',', '.')));
        return price <= filters.maxPrice &&
          filters.categories.includes(funko.series);
      });

      this.errorMessage = null;
    } catch (error) {
      this.errorMessage = 'Failed to load products';
      this.filteredFunkos = [];
    } finally {
      this.loading = false;
    }
  }
}
