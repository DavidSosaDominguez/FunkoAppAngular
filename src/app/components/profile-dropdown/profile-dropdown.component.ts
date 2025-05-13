import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileDropdownService } from '../../services/profile-dropdown.service';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})

export class ProfileDropdownComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public dropdownService = inject(ProfileDropdownService);

  logout(): void {
    this.authService.logout();
    this.dropdownService.hide(); // Oculta el menú tras cerrar sesión
  }

  goToProfileEdit(): void {
    this.router.navigate(['/edit-profile']);
    this.dropdownService.hide(); // Oculta el menú tras navegar
  }
}
