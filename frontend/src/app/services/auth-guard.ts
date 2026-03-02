import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(Auth);

  if (!authService.isLoggedIn()) {
    router.navigate(['/ login']);
    return false;
  }

  const role = authService.getRole();
  const rolesAllowed = route.data?.['roles'];

  if (rolesAllowed) {
    if (!role || !rolesAllowed.includes(role)) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};
