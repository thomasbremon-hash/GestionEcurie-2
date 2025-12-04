import { Component, computed, signal } from '@angular/core';
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

  constructor(private utilisateurService: UtilisateurService) {}

  toggleMenu() {
    this.show.update((s) => !s);
  }

  // Routes filtrées par rôle de l'utilisateur
  navigations = computed(() => {
    const user = this.utilisateurService.utilisateur();
    if (!user) return []; // pas connecté → rien

    const allLinks = [
      { path: '/admin', name: 'Admin', roles: ['admin'] },
      { path: '/gestionnaire', name: 'Gestionnaire', roles: ['gestionnaire'] },
      { path: '/client', name: 'Client', roles: ['client'] },
      { path: '/collaborateur', name: 'Collaborateur', roles: ['collaborateur'] },
      { path: '/comptabilite', name: 'Comptabilité', roles: ['compta'] },
    ];

    return allLinks.filter((link) => link.roles.some((r) => user.roles.includes(r)));
  });
}
