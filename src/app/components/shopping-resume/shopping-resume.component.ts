import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Funko } from '../../interfaces/funko';

@Component({
  selector: 'app-shopping-resume',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-resume.component.html',
  styleUrls: ['./shopping-resume.component.css']
})
export class ShoppingResumeComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Observables del servicio
  cartItems$ = this.cartService.cartItems$;
  isVisible$ = this.cartService.isVisible$;
  totalAmount$ = this.cartService.totalAmount$;

  constructor() {}

  // Métodos para modificar cantidades
  increaseQuantity(funko: Funko): void {
    const newQuantity = (funko.quantity || 1) + 1;
    this.cartService.updateItemQuantity(funko.id, newQuantity);
  }

  decreaseQuantity(funko: Funko): void {
    const currentQuantity = funko.quantity || 1;
    if (currentQuantity > 1) {
      this.cartService.updateItemQuantity(funko.id, currentQuantity - 1);
    } else {
      this.removeProduct(funko.id);
    }
  }

  updateQuantityManually(funko: Funko, event: Event): void {
    const input = event.target as HTMLInputElement;
    let newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
      input.value = '1';
    }

    this.cartService.updateItemQuantity(funko.id, newQuantity);
  }

  removeProduct(funkoId: number): void {
    this.cartService.removeFromCart(funkoId);
  }

  reserve(): void {
    this.cartService.buy();
  }

  closeCart(): void {
    this.cartService.toggleVisibility();
  }
}
