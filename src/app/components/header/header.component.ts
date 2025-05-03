import {Component, Output, EventEmitter, inject} from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AuthServiceService} from '../../services/auth-service.service';

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
  authService = inject(AuthServiceService);

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

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSign.set({
          email: user.email!,
          username: user.displayName!
        })
      } else {
        this.authService.currentUserSign.set(null);
      }
    })
  }
}
