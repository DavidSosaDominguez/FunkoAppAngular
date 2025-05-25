import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list/product-list.page').then(m => m.ProductListPage)
  },
  {
    path: 'product-detailed/:id',
    loadComponent: () => import('./pages/product-detailed/product-detailed.page').then(m => m.ProductDetailedPage)
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in.page').then( m => m.SignInPage)
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up.page').then( m => m.SignUpPage)
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-page/user-profile.page').then(m => m.UserProfilePage)
  }
];
