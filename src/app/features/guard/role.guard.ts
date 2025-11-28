// src/app/guards/role.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UtilisateurService } from '../utilisateurs/utilisateur.service';

export const roleGuard = (roles: string[]): CanActivateFn => {
  return async () => {
    const auth = inject(AuthService);
    const userService = inject(UtilisateurService);
    const router = inject(Router);

    const firebaseUser = auth.utilisateur();
    if (!firebaseUser) {
      router.navigate(['/login']);
      return false;
    }

    const userData = await userService.getUser(firebaseUser.uid);

    if (!userData?.roles) {
      router.navigate(['/']);
      return false;
    }

    const isAllowed = userData.roles.some((r: string) => roles.includes(r));

    if (!isAllowed) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
};
