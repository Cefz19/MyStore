import { Routes } from '@angular/router';

import { TasksComponent } from './pages/tasks.component/tasks.component';
import { GridComponent } from './pages/grid.component/grid.component';
import { LayoutComponent } from './components/layout.component/layout.component';

export const routesMcms: Routes = [
  { 
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: '',
            redirectTo: 'grid',
            pathMatch: 'full',
        },
        {
            path: 'grid',
            component: GridComponent,
        },
        {
            path: 'tasks',
            component: TasksComponent,
        }
    ]
 }
];