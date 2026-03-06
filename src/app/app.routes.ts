import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'my-cart',
        component: MyCartComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'recovery',
        component: RecoveryComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];
