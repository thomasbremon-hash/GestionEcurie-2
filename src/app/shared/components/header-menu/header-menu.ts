import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UtilisateurService } from '../../../features/utilisateurs/utilisateur.service';

@Component({
  selector: 'app-header-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-menu.html',
  styleUrls: ['./header-menu.scss'],
})
export class HeaderMenu {
  show = signal(false);

  private utilisateurService = inject(UtilisateurService);

  // Accès correct au signal
  utilisateur = this.utilisateurService.utilisateur;

  constructor() {}

  toggleMenu() {
    this.show.update((s) => !s);
  }

  // Routes filtrées par rôle
  navigations = computed(() => {
    const user = this.utilisateur(); // ✅ Appel du signal pour obtenir la valeur
    if (!user) return []; // Firestore pas encore chargé

    const allLinks = [
      { path: '/admin', name: 'Admin', roles: ['admin'] },
      { path: '/gestionnaire', name: 'Gestionnaire', roles: ['gestionnaire'] },
      { path: '/client', name: 'Client', roles: ['client'] },
      { path: '/collaborateur', name: 'Collaborateur', roles: ['collaborateur'] },
      { path: '/comptabilite', name: 'Comptabilité', roles: ['comptabilite'] },
    ];

    return allLinks.filter((link) => link.roles.some((r) => user.roles.includes(r)));
  });
}
