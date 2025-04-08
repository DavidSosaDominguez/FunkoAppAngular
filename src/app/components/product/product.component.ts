import {Component, Input} from '@angular/core';
import {Funko} from '../../../funko';
import {ProductDetailledComponent} from '../product-detailled/product-detailled.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() funko!: Funko;

  private product: ProductDetailledComponent;

  viewProductDetailled(id: number) {
    this.product.viewProductDetailled(id);
  }

  constructor(product: ProductDetailledComponent) {
    this.product = product;
  }

}
