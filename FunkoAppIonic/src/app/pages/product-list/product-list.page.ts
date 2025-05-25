import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguresService } from '../../services/figures.service';
import { Funko } from '../../interfaces/funko';
import { IonicModule } from "@ionic/angular";
import { ProductComponent } from "../../components/product/product.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ShoppingResumeComponent } from "../../components/shopping-resume/shopping-resume.component";
import { FilterBoxComponent } from "../../components/filter-box/filter-box.component";
import { FavoriteService } from "../../services/favorite.service";

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ProductComponent, HeaderComponent, FooterComponent, ShoppingResumeComponent, FilterBoxComponent],
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css']
})

export class ProductListPage implements OnInit {
  filteredFunkos: Funko[] = [];
  allFunkos: Funko[] = [];
  loading = true;
  errorMessage = false;
  currentSearchTerm: string = '';
  currentFilters = {
    maxPrice: Infinity,
    categories: [] as string[],
    favoritesOnly: false
  };

  constructor(
      private funkoService: FiguresService,
      private route: ActivatedRoute,
      private favoriteService: FavoriteService,
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
      this.currentFilters = {
        maxPrice: +(params['maxPrice'] || Infinity),
        categories: params['categories']?.split(',') || [],
        favoritesOnly: params['favoritesOnly'] === 'true' // Convertir string a boolean
      };
      this.applyCurrentFilters();
    });
  }

  private applyCurrentFilters(): void {
    if (!this.allFunkos.length) return;

    this.filteredFunkos = this.allFunkos.filter(f => {
      const matchesPrice = f.price <= this.currentFilters.maxPrice;
      const matchesCategory = this.currentFilters.categories.length === 0 ||
          this.currentFilters.categories.includes(f.series.toUpperCase());
      const matchesSearch = this.matchesSearchTerm(f, this.currentSearchTerm);
      const matchesFavorites = !this.currentFilters.favoritesOnly ||
          this.favoriteService.isFavorite(f.id); // Usar el servicio aquí

      return matchesPrice && matchesCategory && matchesSearch && matchesFavorites;
    });
  }

  private matchesSearchTerm(funko: Funko, term: string | undefined | null): boolean {
    if (!term?.trim()) return true;
    const lowerTerm = term.toLowerCase();
    return (
        funko.name?.toLowerCase().includes(lowerTerm) ||
        (funko.series?.toLowerCase().includes(lowerTerm)
        ))
  }
}
