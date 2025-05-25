import {Component, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileDropdownService } from '../../services/profile-dropdown.service';
import { FilterService } from '../../services/filter.service';
import { CartService } from '../../services/cart.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { AsyncPipe, NgIf } from '@angular/common';
import {User} from '@angular/fire/auth';
import {Subscription} from 'rxjs';
import {IonicModule} from "@ionic/angular";  // Asegúrate de importar AsyncPipe y NgIf


@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [FormsModule, AsyncPipe, NgIf, ProfileDropdownComponent, IonicModule],
})

export class HeaderComponent implements OnInit, OnDestroy{
  @Output() searchEvent = new EventEmitter<string>();
  searchTerm: string = '';

  // Hacemos públicas las propiedades
  public authService: AuthService;
  public profileDropdownService: ProfileDropdownService;

  // Inyectamos los servicios a través del constructor
  constructor(
    private filterService: FilterService,
    private cartService: CartService,
    authService: AuthService,  // Inyección
    profileDropdownService: ProfileDropdownService,  // Inyección
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.authService = authService;  // Asignación
    this.profileDropdownService = profileDropdownService;  // Asignación
  }

  currentUser: User|null = null;
  private userSub?: Subscription;

  profileImageURL: string = '';

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
      queryParams: {search: this.searchTerm},
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
    this.userSub = this.authService.user$.subscribe(async user => {
      this.currentUser = user;
      if(this.currentUser) {
        const firestoreUser = await this.authService.getCurrentFirestoreUser();
        this.profileImageURL = firestoreUser ? firestoreUser.pictureURL : '';
      }
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }
}
