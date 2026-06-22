import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { map, take } from 'rxjs';
import { authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }
      router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    })
  );
};

export const guestGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }
      router.navigateByUrl('/tabs/children', { replaceUrl: true });
      return false;
    })
  );
};