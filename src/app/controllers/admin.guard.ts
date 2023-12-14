import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const redirect = inject(Router);
  if (sessionStorage.getItem('role') !== 'ROLE_ADMIN') {
    redirect.navigate(['/']);
    return false;
  }
  return sessionStorage.getItem('role') === 'ROLE_ADMIN';

};
