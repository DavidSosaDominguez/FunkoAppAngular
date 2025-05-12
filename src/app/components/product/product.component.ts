import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router
import { Funko } from '../../interfaces/funko';
import { FavoriteService } from '../../services/favorite.service';
import { AuthServiceService} from '../../services/auth-service.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input({ required: true }) funko!: Funko;

  constructor(private router: Router, private favoriteService: FavoriteService, public authService: AuthServiceService) {}

  isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.funko.id);
  }

  toggleFavorite(): void {
    this.favoriteService.toggleFavorite(this.funko.id);
  }

  viewProductDetailed(): void {
    if (this.funko?.id) {
      this.router.navigate(['/product-detail', this.funko.id]);
    }
  }
}
