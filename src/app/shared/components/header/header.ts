import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderMenu } from '../header-menu/header-menu';
import { AuthService } from '../../../features/auth/auth.service';
import { UtilisateurService } from '../../../features/utilisateurs/utilisateur.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

   private auth = inject(AuthService);
  private utilisateurService = inject(UtilisateurService);

  userRoles = signal<string[]>([]);
  isConnected = computed(() => !!this.auth.utilisateur());

  constructor() {
    effect(async () => {
      const fbUser = this.auth.utilisateur();

      if (!fbUser) {
        this.userRoles.set([]);
        return;
      }

      const userData = await this.utilisateurService.getUser(fbUser.uid);
      this.userRoles.set(userData?.roles ?? []);
    });
  }

  hasRole(role: string) {
    return this.userRoles().includes(role);
  }
}
