import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguresService } from '../../services/figures.service';
import { Funko } from '../../../funko';

@Component({
  selector: 'app-product-detailed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css']
})
export class ProductDetailedComponent implements OnInit {
  funko: Funko | null = null;
  relatedFunkos: Funko[] = [];
  loading = true;
  error = false;
  loadingRelated = false;

  constructor(
    private route: ActivatedRoute,
    private funkoService: FiguresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.loadFunkoDetails(productId);
    });
  }

  private loadFunkoDetails(productId: number): void {
    this.loading = true;
    this.error = false;
    this.funko = null;
    this.relatedFunkos = [];

    this.funkoService.getFunkoById(productId).subscribe({
      next: (funko) => {
        this.funko = funko || null;
        if (funko) {
          this.loadRelatedFunkos(productId, funko.series);
        }
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadRelatedFunkos(currentId: number, series: string): void {
    this.loadingRelated = true;

    this.funkoService.getAllFunkos().subscribe({
      next: (funkos) => {
        this.relatedFunkos = funkos.filter(f =>
          f.series === series && f.id !== currentId
        ).slice(0, 4);
        this.loadingRelated = false;
      },
      error: () => {
        this.loadingRelated = false;
      }
    });
  }

  viewProductDetailed(id: number): void {
    // Navegación sin recargar la página completa
    this.router.navigate(['/product-detail', id]);
    // No necesitamos then() porque el params subscription se encarga
  }
}
