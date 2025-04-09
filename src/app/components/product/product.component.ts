import {Component, inject, Input} from '@angular/core';
import {Funko} from '../../../funko';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: '../product-list/product-list.component.css'
})
export class ProductComponent {
  @Input() funko!: Funko;

  constructor(private http: HttpClient, private router: Router) {}

  viewProductDetailled(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }
}
