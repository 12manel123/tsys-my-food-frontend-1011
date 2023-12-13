import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {

  const redirect = inject(Router);
  if (sessionStorage.getItem('role') !== 'ROLE_USER') {
    redirect.navigate(['/']);
    return false;
  }

  return sessionStorage.getItem('role') === 'ROLE_USER';
};
