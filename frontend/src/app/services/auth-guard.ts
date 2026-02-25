import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(Auth);

  const token = localStorage.getItem('token');

   if (!token) {
    router.navigate(['/login']);
    return false;
  }
  
  const rolesAllowed = route.data?.['roles'];

  const role = authService.getRole();

  // Si la route a des rôles définis
  if (rolesAllowed && !rolesAllowed.includes(role)) {
    router.navigate([`/dashboard/${role}`]);
    return false;
  }
  return true;
};