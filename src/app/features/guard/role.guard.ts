// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { UtilisateurService } from '../../features/utilisateurs/utilisateur.service';

export const RoleGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const utilisateurService = inject(UtilisateurService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'] ?? [];

  const fbUser = auth.utilisateur();
  if (!fbUser) {
    // Pas connecté -> redirection vers login
    return router.parseUrl('/login');
  }

  try {
    // Récupération des rôles depuis Firestore
    const userData = await utilisateurService.getUser(fbUser.uid);
    const hasRole = userData.roles.some((role) => expectedRoles.includes(role));

    return hasRole ? true : router.parseUrl('/');
  } catch (err) {
    console.error('Erreur lors de la récupération des rôles', err);
    console.log('test');
    return router.parseUrl('/login');
  }
};
