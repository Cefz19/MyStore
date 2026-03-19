import { Routes } from '@angular/router';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.routes').then((m) => m.webRoutes),
    data: {
      preload: true,
    },
  },
  {
    path: 'mcms',
    canActivate: [authGuard],
    loadChildren: () => import('./mcms/mcms.routes').then((m) => m.routesMcms),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
