import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailedComponent } from './components/product-detailed/product-detailed.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product-detail/:id', component: ProductDetailedComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'sign-in', component: SignInComponent },
];
