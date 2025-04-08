import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Funko} from '../../../funko';
import {ProductComponent} from '../product/product.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../../services/filter.service';


interface ParsedFunko extends Omit<Funko, 'price'> {
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  funkos: ParsedFunko[] = [];
  filteredFunkos: ParsedFunko[] = [];
  loading = true;
  errorMessage = '';

  // Valores predeterminados para los filtros
  priceFilter: number = 100;
  selectedCategories: Set<string> = new Set();

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute, // Para leer los parámetros de la URL
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.loadFunkos();

    // Suscripción para escuchar los cambios en los parámetros de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['price']) {
        this.priceFilter = Number(params['price']);
      }
      if (params['categories']) {
        this.selectedCategories = new Set(params['categories'].split(','));
      }

      this.applyFilters({
        maxPrice: this.priceFilter,
        categories: Array.from(this.selectedCategories)
      });
    });

    this.filterService.filters$.subscribe((filters) => {
      this.applyFilters(filters);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['priceFilter'] || changes['selectedCategories']) {
      this.applyFilters({
        maxPrice: this.priceFilter,
        categories: Array.from(this.selectedCategories)
      });
    }
  }

  loadFunkos(): void {
    this.http.get<Funko[]>('assets/funkos_data.json').subscribe(
      (data: Funko[]) => {
        this.funkos = data.map(funko => ({
          ...funko,
          price: parseFloat(funko.price.replace(',', '.')) // Convierte de string a number
        }));

        this.applyFilters({
          maxPrice: this.priceFilter,
          categories: Array.from(this.selectedCategories)
        });

        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos';
        this.loading = false;
      }
    );
  }


  applyFilters(filters: { maxPrice: number; categories: string[] }): void {
    this.filteredFunkos = this.funkos.filter(funko =>
      funko.price <= filters.maxPrice &&
      (filters.categories.length === 0 || filters.categories.includes(funko.series))
    );
  }

  viewProductDetailled(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}

