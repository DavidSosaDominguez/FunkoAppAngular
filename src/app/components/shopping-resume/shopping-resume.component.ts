import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-resume',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-resume.component.html',
  styleUrls: ['./shopping-resume.component.css']
})
export class ShoppingResumeComponent {
  isVisible = false;

  private cartService = inject(CartService);
  private router = inject(Router);


  // Lista de productos reservados (puede integrarse con una API o servicio más adelante)
  products = [
    { name: 'Lorem ipsum veritas', price: 30, quantity: 2, image: 'assets/resource-images/image-icon.png' },
    { name: 'Lorem ipsum veritas', price: 45, quantity: 1, image: 'assets/resource-images/image-icon.png' },
    { name: 'Lorem ipsum veritas', price: 20, quantity: 3, image: 'assets/resource-images/image-icon.png' }
  ];

  constructor() {
    this.cartService.isVisible$.subscribe(visible => {
      this.isVisible = !visible;
    });
  }

  get totalPrice(): number {
    return this.products.reduce((total, p) => total + p.price * p.quantity, 0);
  }

  reserve(): void {
    console.log('Reserva realizada:', this.products);
    alert('¡Productos reservados con éxito!');
  }
}
