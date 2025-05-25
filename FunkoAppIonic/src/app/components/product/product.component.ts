import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router
import { Funko } from '../../interfaces/funko';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService} from '../../services/auth.service';
import {User} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {IonicModule} from "@ionic/angular";


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input({ required: true }) funko!: Funko;
  currentUser: User|null = null;
  private userSub?: Subscription;

  constructor(private router: Router, private favoriteService: FavoriteService, public authService: AuthService) {}

  isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.funko.id);
  }

  toggleFavorite(): void {
    this.favoriteService.toggleFavorite(this.funko.id);
  }

  viewProductDetailed(): void {
    if (this.funko?.id) {
      this.router.navigate(['/product-detailed', this.funko.id]);
    }
  }

  ngOnInit() {
    this.userSub = this.authService.user$.subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
