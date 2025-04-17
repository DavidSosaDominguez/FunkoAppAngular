import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Funko } from '../../../funko';
import { FiguresService } from '../../../figures.service';

@Component({
  selector: 'app-product-detailled',
  standalone: true,
  imports: [CommonModule, RouterModule], // Eliminamos HttpClientModule
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

  private funkoService = inject(FiguresService); // Inyectamos el servicio

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    // Obtenemos los datos del servicio en lugar de HTTP
    const allFunkos = this.funkoService.getAllFunkos();
    this.funko = allFunkos.find((f) => f.id === productId);
    this.loading = false;

    if (!this.funko) {
      this.errorMessage = 'Producto no encontrado';
      return;
    }

    this.loadRelatedProducts(productId);
  }

  loadRelatedProducts(productId: number): void {
    const allFunkos = this.funkoService.getAllFunkos();
    this.relatedFunkos = allFunkos.filter(
      (f) => f.series === this.funko?.series && f.id !== productId
    );
    this.loadingRelated = false;
  }

  viewProductDetailled(productId: number): void {
    this.router.navigate(['/product-detail', productId]).then(() => {
      this.loadProduct(); // Recargar producto al navegar
    });
  }
}
