import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // In a real app, check AuthService for authentication status
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const router = inject(Router);

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
