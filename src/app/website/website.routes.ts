import { Routes } from '@angular/router';

import { LayoutComponent } from './../website/components/layout.component/layout.component';
import { HomeComponent } from './../website/pages/home/home.component';
import { LoginComponent } from './../website/pages/login/login.component';
import { MyCartComponent } from './../website/pages/my-cart/my-cart.component';
import { ProfileComponent } from './../website/pages/profiles/profile.component';
import { RecoveryComponent } from './../website/pages/recovery/recovery.component';
import { RegisterComponent } from './../website/pages/registers/register.component';
import { ProductDetailComponent } from './../website/pages/product-detail.components/product-detail.component';
import { authGuard } from '../guards/auth-guard';

export const webRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./pages/category/category.routes').then((m) => m.categoryRoutes),
        data: {
          preload: true,
        },
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'my-cart',
        component: MyCartComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'profile',
        canActivate: [ authGuard ],
        component: ProfileComponent,
        
      },
      {
        path: 'recovery',
        component: RecoveryComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
];
