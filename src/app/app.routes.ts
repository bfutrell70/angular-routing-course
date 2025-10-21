import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authRouteGuard } from './cart-auth-route-guard';
import { HomeUpdatedComponent } from './home-updated/home-updated.component';
import { inject } from '@angular/core';
import { FeatureFlagService } from './services/feature-flag.service';
import { map } from 'rxjs';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotReadyComponent } from './not-ready/not-ready.component';
import { HelloService } from './services/hello.service';

export enum ROUTER_TOKENS {
  HOME = 'home',
  SHOP = 'shop',
  CONTACT = 'contact',
  ABOUT = 'about',
  CHECKOUT = 'checkout',
  CART = 'cart',
  NOT_AUTH = 'not-auth',
  NOT_READY = 'not-ready'
}

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeUpdatedComponent,
    canMatch: [() => {
      const featureService = inject(FeatureFlagService);

      return featureService.featureFlags.pipe(
        // !! converts to a boolean
        map((flags) => !!flags.home)
      );
    }]
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
  },
  {
    path: `${ROUTER_TOKENS.SHOP}/:categoryId` ,
    loadChildren: () => import('./products-view/products.routes').then(m => m.PRODUCT_ROUTES),
  },
  {
    path: ROUTER_TOKENS.CONTACT,
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent),
    canMatch: [() => {
      const featureService = inject(FeatureFlagService);
      const router = inject(Router);

      return featureService.featureFlags.pipe(
        // !! converts to a boolean
        map((flags) => !!flags.contact || router.parseUrl(`/${ROUTER_TOKENS.NOT_READY}`))
      );
    },
    // checks if the user is authorized to view the contact page
    authRouteGuard(ROUTER_TOKENS.CONTACT)
    ],
    resolve: {
      userHello: () => {
        const helloService = inject(HelloService);

        return helloService.getUserHello();
      }
    }
  },
  {
    path: ROUTER_TOKENS.ABOUT,
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  {
    path: ROUTER_TOKENS.CHECKOUT,
    outlet: ROUTER_TOKENS.CART,
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [authRouteGuard(ROUTER_TOKENS.CART)]
  },
  {
    path: ROUTER_TOKENS.NOT_AUTH,
    component: NotAuthorizedComponent,
  },
  {
    path: ROUTER_TOKENS.NOT_READY,
    component: NotReadyComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
