import { Routes } from '@angular/router';
import { authGuard, publicGuard, adminGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    {path: 'home', title: 'Home',
         loadComponent: () => import("./pages/home/home.component").then(m=>m.HomeComponent)},
    {path: 'shop', title: 'Shop',
        loadComponent: () => import("./pages/shop/shop.component").then(m=>m.ShopComponent)},
    {path: 'cart', title: 'Cart',
        loadComponent: () => import("./pages/basket/basket.component").then(m=>m.BasketComponent)},
    {path: 'login', title: 'Login',
        loadComponent: () => import("./pages/login/login.component").then(m=>m.LoginComponent),
    canActivate: [publicGuard]},
    {path: 'register', title: 'Register',
        loadComponent: () => import("./pages/register/register.component").then(m=>m.RegisterComponent),
    canActivate: [publicGuard]},
    {path: 'profile', title: 'Profile',
        loadComponent: () => import("./pages/profile/profile.component").then(m=>m.ProfileComponent),
    canActivate: [authGuard]},
    {path: 'add', title: 'AddProduct',
        loadComponent: () => import("./pages/add/add.component").then(m=>m.AddComponent),
    canActivate: [adminGuard]},
    {path: 'update', title: 'UpdateProduct',
        loadComponent: () => import("./pages/update/update.component").then(m=>m.UpdateComponent),
    canActivate: [adminGuard]},
    {path: '**',
        loadComponent: () => import("./pages/home/home.component").then(m=>m.HomeComponent)}
];
