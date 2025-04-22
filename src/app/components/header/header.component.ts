import { Component, Output, EventEmitter } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule], // Añade FormsModule aquí
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  constructor(
    private filterService: FilterService,
    private cartService: CartService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  toggleFilter(): void {
    this.filterService.toggleVisibility();
  }

  toggleCart(): void {
    this.cartService.toggleVisibility();
  }

  returnHome(): void {
    this.router.navigate(['']);
  }

  onSearch(): void {
    this.searchEvent.emit(this.searchTerm);
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: { search: this.searchTerm },
      queryParamsHandling: 'merge'
    });
  }

  goToSignUpPage() {
    this.router.navigate(['/sign-up']);
  }

  goToSignInPage() {
    this.router.navigate(['/sign-in']);
  }
}
