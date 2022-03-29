import { Routes } from '@angular/router';

export const MODEL_LAYOUT_ROUTE: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../modules/product/product.module').then(m => m.ProductModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
