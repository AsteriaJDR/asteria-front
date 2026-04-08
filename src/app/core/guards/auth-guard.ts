import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUserInfo().pipe(
    map((user) => {
      authService.setCurrentUser(user);
      return true;
    }),
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        router.navigate(['/auth']);
      }
      return of(false);
    })
  );
};