import { Routes } from '@angular/router';

import { LayoutComponent } from './website/components/layout.component/layout.component';
import { HomeComponent } from './website/pages/home/home.component';
import { CategoryComponent } from './website/pages/category/category.component';
import { LoginComponent } from './website/pages/login/login.component';
import { MyCartComponent } from './website/pages/my-cart/my-cart.component';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { ProfileComponent } from './website/pages/profiles/profile.component';
import { RecoveryComponent } from './website/pages/recovery/recovery.component';
import { RegisterComponent } from './website/pages/registers/register.component';
import { ProductDetailComponent } from './website/pages/product-detail.components/product-detail.component';

export const routes: Routes = [
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
        path: 'category/:id',
        component: CategoryComponent,
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
  {
    path: 'mcms',
    loadChildren: () => import('./mcms/mcms.routes').then((m) => m.routesMcms),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
