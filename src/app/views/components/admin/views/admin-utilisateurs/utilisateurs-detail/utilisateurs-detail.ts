import { Component, effect, inject, input, NgZone } from '@angular/core';
import { Utilisateur } from '../../../../../../interface/user';
import { UtilisateurService } from '../../../../../../services/utilisateur.service';
import { AuthService } from '../../../../../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../../../../services/session.service';
@Component({
  selector: 'app-utilisateurs-detail',
  imports: [],
  templateUrl: './utilisateurs-detail.html',
  styleUrl: './utilisateurs-detail.scss',
})
export class UtilisateursDetail {
  user = input<Utilisateur | null>();
  sessionService = inject(SessionService);
  userService = inject(UtilisateurService);
  router = inject(Router);
  private zone = inject(NgZone);

  utilisateur = this.userService.utilisateur;

  uid = this.userService.utilisateurID;

  userExist = this.userService.userExits;

  constructor() {
    effect(() => {
      console.log('Détails utilisateur :', this.user);
    });
  }

  async deleteUser() {
    try {
      const currentUser = this.user();
      if (currentUser && currentUser._id) {
        await this.userService.deleteContact(currentUser._id);
        console.log('✅ Utilisateur supprimé avec succès');

        // Rafraîchir la liste d'utilisateurs
        this.userService.refreshUsers();

        // Rediriger vers la liste
        this.zone.run(() => this.router.navigate(['/admin/utilisateurs']));
      }
    } catch (err) {
      console.error('❌ Erreur suppression utilisateur :', err);
    }
  }
  async updateUser() {
    try {
      const currentUser = this.user();
      if (currentUser && currentUser._id) {
        await this.userService.updateUser(currentUser._id, currentUser);
        console.log('✅ Utilisateur mis à jour avec succès');
        // Rafraîchir la liste d'utilisateurs
        this.userService.refreshUsers();
      }
    } catch (err) {
      console.error('❌ Erreur mise à jour utilisateur :', err);
    }
  }

  goToEdit() {
    const currentUser = this.user();
    if (!currentUser?._id) return;

    this.router.navigate([`/admin/utilisateurs/${currentUser._id}/edit`]);
  }
}
