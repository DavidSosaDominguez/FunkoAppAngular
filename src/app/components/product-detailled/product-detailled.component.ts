// src/app/components/product-detailled/product-detailled.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import {Funko} from '../../Interfaces/funko';

@Component({
  selector: 'app-product-detailled',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './product-detailled.component.html',
  styleUrls: ['./product-detailled.component.css']
})
export class ProductDetailledComponent implements OnInit {
  funko: Funko | undefined;
  relatedFunkos: Funko[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;
  loadingRelated: boolean = true;
  errorRelatedMessage: string | null = null;

  // Nuevo: inyectamos FilterService
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.http.get<Funko[]>('assets/funkos_data.json').subscribe(
      (data: Funko[]) => {
        this.funko = data.find((f) => f.id === productId);
        this.loading = false;

        if (!this.funko) {
          this.errorMessage = 'Producto no encontrado';
          return;
        }

        this.loadRelatedProducts(productId);
      },
      () => {
        this.errorMessage = 'Error al cargar los datos del producto';
        this.loading = false;
      }
    );
  }

  loadRelatedProducts(productId: number): void {
    this.http.get<Funko[]>('assets/funkos_data.json').subscribe(
      (relatedData: Funko[]) => {
        this.relatedFunkos = relatedData.filter(
          (f) => f.series === this.funko?.series && f.id !== productId
        );
        this.loadingRelated = false;
      },
      () => {
        this.errorRelatedMessage = 'No se encuentran productos relacionados';
        this.loadingRelated = false;
      }
    );
  }

  viewProductDetailled(productId: number): void {
    this.router.navigate(['/product-detail', productId]).then(() => {
      this.loadProduct(); // Recargar producto al navegar
    });
  }
}
