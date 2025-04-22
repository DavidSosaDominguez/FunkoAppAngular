import {Component, Input} from '@angular/core';
import {Funko} from '../../Interfaces/funko';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: '../product-list/product-list.component.css'
})
export class ProductComponent {
  @Input() funko!: Funko;

  constructor(private router: Router) {}

  viewProductDetailed(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}
