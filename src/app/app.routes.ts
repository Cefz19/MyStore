import { Routes } from '@angular/router';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';

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
    loadChildren: () => import('./mcms/mcms.routes').then((m) => m.routesMcms),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
