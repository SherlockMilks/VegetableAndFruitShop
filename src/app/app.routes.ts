import { Routes } from '@angular/router';


export const routes: Routes = [
    {path: 'home', title: 'Home',
         loadComponent: () => import("./pages/home/home.component").then(m=>m.HomeComponent)},
    {path: 'shop', title: 'Shop',
        loadComponent: () => import("./pages/shop/shop.component").then(m=>m.ShopComponent)},
    {path: 'cart', title: 'Cart',
        loadComponent: () => import("./pages/basket/basket.component").then(m=>m.BasketComponent)},
    {path: 'login', title: 'Login',
        loadComponent: () => import("./pages/login/login.component").then(m=>m.LoginComponent)},
    {path: 'register', title: 'Register',
        loadComponent: () => import("./pages/register/register.component").then(m=>m.RegisterComponent)},
    {path: 'profile', title: 'Profile',
        loadComponent: () => import("./pages/profile/profile.component").then(m=>m.ProfileComponent)},
    {path: '**',
        loadComponent: () => import("./pages/home/home.component").then(m=>m.HomeComponent)}
];
