import {Component, Input} from '@angular/core';
import {Funko} from '../../../funko';
import {ProductDetailledComponent} from '../product-detailled/product-detailled.component';

@Component({
  selector: 'app-product',
  imports: [ProductDetailledComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() funko!: Funko;
}
