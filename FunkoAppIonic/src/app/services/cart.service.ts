import {inject, Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Funko } from '../interfaces/funko';
import {FiguresService} from "./figures.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Funko[]>([]);
  private isCartVisibleSubject = new BehaviorSubject<boolean>(false);
  figuresService = inject(FiguresService);

  // Exponer como Observables
  cartItems$ = this.cartItemsSubject.asObservable();
  isVisible$ = this.isCartVisibleSubject.asObservable();

  // Cache para cálculos
  private totalAmountSubject = new BehaviorSubject<number>(0);
  private itemsCountSubject = new BehaviorSubject<number>(0);

  totalAmount$ = this.totalAmountSubject.asObservable();
  itemsCount$ = this.itemsCountSubject.asObservable();

  constructor() {
    this.loadInitialCart();
  }

  private loadInitialCart(): void {
    const savedCart = sessionStorage.getItem('funko_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          this.cartItemsSubject.next(parsedCart);
          this.updateCalculations();
        }
      } catch (e) {
        console.error('Error loading cart', e);
        this.clearStorage();
      }
    }
  }

  private updateCalculations(): void {
    const items = this.cartItemsSubject.value;

    // Calcular total
    const total = items.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );

    // Calcular cantidad total de items
    const count = items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    this.totalAmountSubject.next(total);
    this.itemsCountSubject.next(count);
    this.saveCart();
  }

  private saveCart(): void {
    const cartData = this.cartItemsSubject.value;
    sessionStorage.setItem('funko_cart', JSON.stringify(cartData));
  }

  private clearStorage(): void {
    sessionStorage.removeItem('funko_cart');
  }

  addToCart(funko: Funko): void {
    const currentItems = this.cartItemsSubject.value;
    const existingIndex = currentItems.findIndex(item => item.id === funko.id);

    if (existingIndex > -1) {
      currentItems[existingIndex] = {
        ...currentItems[existingIndex],
        quantity: (currentItems[existingIndex].quantity || 1) + 1
      };
    } else {
      currentItems.push({ ...funko, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentItems]);
    this.updateCalculations();
  }

  removeFromCart(funkoId: number): void {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.id !== funkoId);
    this.cartItemsSubject.next(updatedItems);
    this.updateCalculations();
  }

  updateItemQuantity(funkoId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(funkoId);
      return;
    }

    const updatedItems = this.cartItemsSubject.value.map(item =>
      item.id === funkoId ? { ...item, quantity } : item
    );

    this.cartItemsSubject.next(updatedItems);
    this.updateCalculations();
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.clearStorage();
    this.updateCalculations();
  }

  getCurrentCartItems(): Funko[] {
    return [...this.cartItemsSubject.value];
  }

  toggleVisibility(visible?: boolean): void {
    if (typeof visible === 'boolean') {
      this.isCartVisibleSubject.next(visible);
    } else {
      this.isCartVisibleSubject.next(!this.isCartVisibleSubject.value);
    }
  }

  hide(): void {
    this.isCartVisibleSubject.next(false);
  }

  // Métodos útiles para el checkout
  getCartSummary() {
    const items = this.cartItemsSubject.value;
    return {
      items: [...items],
      total: this.totalAmountSubject.value,
      count: this.itemsCountSubject.value
    };
  }

  buy() {
    /*actualizar el número de funkos restantes*/
    for (let item of this.cartItemsSubject.value) {
      this.figuresService.modifyQuantity(item).then(() => {});
    }
    this.clearCart();
  }
}
