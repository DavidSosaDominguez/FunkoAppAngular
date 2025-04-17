import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router
import { Funko } from '../../../funko';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input({ required: true }) funko!: Funko;

  constructor(private router: Router) {}

  viewProductDetailed(): void {
    if (this.funko?.id) {
      this.router.navigate(['/product-detail', this.funko.id]);
    }
  }
}
