import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ProfileDropdownService } from '../../services/profile-dropdown.service';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { AsyncPipe, NgIf } from '@angular/common';  // Asegúrate de importar AsyncPipe y NgIf

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [FormsModule, AsyncPipe, NgIf, ProfileDropdownComponent]
})

export class HeaderComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  // Hacemos públicas las propiedades
  public authService: AuthServiceService;
  public profileDropdownService: ProfileDropdownService;

  // Inyectamos los servicios a través del constructor
  constructor(
    private filterService: FilterService,
    private cartService: CartService,
    authService: AuthServiceService,  // Inyección
    profileDropdownService: ProfileDropdownService,  // Inyección
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.authService = authService;  // Asignación
    this.profileDropdownService = profileDropdownService;  // Asignación
  }

  toggleFilter(): void {
    this.filterService.toggleVisibility();
  }

  toggleCart(): void {
    this.cartService.toggleVisibility();
  }

  toggleProfileDropdown(): void {
    this.profileDropdownService.toggleVisibility();
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
    });
  }
}
