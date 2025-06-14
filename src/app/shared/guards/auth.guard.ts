import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }
      
      console.log('Access denied - Not authenticated');
      router.navigate(['/login']);
      return false;
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }
      
      console.log('Already authenticated, redirecting to home');
      router.navigate(['/home']);
      return false;
    })
  );
};


export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.currentUser.pipe(
    take(1),
    map(user => {
        const userJson = localStorage.getItem('currentUser');
        if (userJson) {
          const user = JSON.parse(userJson);
          if (!!user?.admin_e) {
            return true;}}

            
      console.log('Access denied - Not authenticated');
      router.navigate(['/home']);
      return false;
    })
  );
};