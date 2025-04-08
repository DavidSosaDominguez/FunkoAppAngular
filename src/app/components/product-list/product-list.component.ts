import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

// Interfaz original para el JSON
interface Funko {
  id: number;
  name: string;
  series: string;
  price: string;
  description: string;
  image: string;
}

// Interfaz con precio convertido a number
interface ParsedFunko extends Omit<Funko, 'price'> {
  price: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  funkos: ParsedFunko[] = [];
  filteredFunkos: ParsedFunko[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    // Cargar los datos del JSON y convertir el precio a número
    this.http.get<Funko[]>('assets/funkos_data.json').subscribe(
      (data: Funko[]) => {
        this.funkos = data.map(funko => ({
          ...funko,
          price: parseFloat(funko.price.replace(',', '.')) // convierte string a number
        }));
        this.filteredFunkos = this.funkos; // Mostrar todos al inicio
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos';
        this.loading = false;
      }
    );

    // Aplicar filtros solo cuando se pulsa "Apply Filters"
    this.filterService.filters$.subscribe((filters) => {
      this.filteredFunkos = this.funkos.filter(funko =>
        funko.price <= filters.maxPrice &&
        (filters.categories.length === 0 || filters.categories.includes(funko.series))
      );
    });
  }

  viewProductDetailled(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}
