import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs';
import { ROUTER_TOKENS } from './app.routes';

export function authRouteGuard(route: string) {
  return () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // !! coerces the value to a boolean
    return authService.userAuth.pipe(
      map((permissions) => !!permissions?.includes(route) || router.parseUrl(`/${ROUTER_TOKENS.NOT_AUTH}`)))
  }
}
