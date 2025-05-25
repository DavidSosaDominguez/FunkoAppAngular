import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguresService } from '../../services/figures.service';
import { Funko } from '../../interfaces/funko';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import {User} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {IonicModule} from "@ionic/angular"; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-product-detailed',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css']
})
export class ProductDetailedComponent implements OnInit {
  funko: Funko | null = null;
  relatedFunkos: Funko[] = [];
  loading = true;
  error = false;
  loadingRelated = false;
  authService = inject(AuthService);

  currentUser: User|null = null;
  private userSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private funkoService: FiguresService,
    private router: Router,
    private cartService: CartService, // Inyecta el servicio del carrito
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.loadFunkoDetails(productId);
    });

    this.userSub = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
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
    this.router.navigate(['/product-detail', id]);
  }

  addToCart(): void {
    if (this.funko) {
      this.cartService.addToCart(this.funko);
    }
  }

  goToSignIn() {
    this.router.navigate(['/sign-in']);
  }

  isFavorite(): boolean {
    return this.funko ? this.favoriteService.isFavorite(this.funko.id) : false;
  }

  toggleFavorite(): void {
    if (this.funko) {
      this.favoriteService.toggleFavorite(this.funko.id);
    }
  }

  trackByFunkoId(index: number, funko: Funko): number {
    return funko.id;
  }


}

