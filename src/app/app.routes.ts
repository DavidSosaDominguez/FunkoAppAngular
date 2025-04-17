import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailedComponent } from './components/product-detailled/product-detailed.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailedComponent }
];
