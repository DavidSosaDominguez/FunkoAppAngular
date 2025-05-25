import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguresService } from '../../services/figures.service';
import { Funko } from '../../interfaces/funko';
import {IonicModule} from "@ionic/angular";
import {ProductComponent} from "../../components/product/product.component";

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ProductComponent],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css']
})
export class ProductListPage implements OnInit {
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
