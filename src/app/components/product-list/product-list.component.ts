import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { FiguresService } from '../../services/figures.service';
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
  allFunkos: Funko[] = [];
  loading = true;
  errorMessage = false;
  currentSearchTerm: string = '';

  constructor(
    private funkoService: FiguresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.setupQueryParamsSubscription();
  }

  private loadInitialData(): void {
    this.loading = true;
    this.funkoService.getAllFunkos().subscribe({
      next: (funkos) => {
        this.allFunkos = funkos;
        this.applyCurrentFilters();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = true;
      }
    });
  }

  private setupQueryParamsSubscription(): void {
    this.route.queryParams.subscribe(params => {
      this.currentSearchTerm = params['search'] || '';
      this.applyCurrentFilters();
    });
  }

  private applyCurrentFilters(): void {
    if (!this.allFunkos.length) return;

    const price = +this.route.snapshot.queryParams['maxPrice'] || Infinity;
    const categories = this.route.snapshot.queryParams['categories']?.split(',') || [];

    this.filteredFunkos = this.allFunkos.filter(f => {
      const funkoPrice = f.price;
      const matchesPrice = funkoPrice <= price;
      const matchesCategory = categories.length === 0 ||
        categories.includes(f.series.toUpperCase());
      const matchesSearch = this.matchesSearchTerm(f, this.currentSearchTerm);

      return matchesPrice && matchesCategory && matchesSearch;
    });
  }

  private matchesSearchTerm(funko: Funko, term: string | undefined | null): boolean {
    if (term === undefined || term === null || typeof term !== 'string' || term.trim() === '') {
      return true;
    }

    const lowerTerm = term.toLowerCase();

    const nameMatches = funko.name?.toLowerCase().includes(lowerTerm) || false;
    const seriesMatches = funko.series?.toLowerCase().includes(lowerTerm) || false;

    return nameMatches || seriesMatches;
  }
}
