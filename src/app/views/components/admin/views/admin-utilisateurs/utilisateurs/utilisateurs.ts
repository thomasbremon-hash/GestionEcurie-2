import { Component, computed, effect, inject, Signal, signal } from '@angular/core';
import { ListeUtilisateurs } from '../utilisateurs-liste/utilisateurs-liste';
import { UtilisateursDetail } from '../utilisateurs-detail/utilisateurs-detail';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UtilisateurService } from '../../../../../../services/utilisateur.service';
import { Utilisateur } from '../../../../../../interface/user';
import { AuthService } from '../../../../../../services/auth.service';

@Component({
  selector: 'app-utilisateurs',
  imports: [ListeUtilisateurs, UtilisateursDetail],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.scss',
})
export class Utilisateurs {
  auth = inject(AuthService);
  userservice = inject(UtilisateurService);
  user = this.auth.utilisateur;
  router = inject(Router);
  users = this.userservice.users;

  utilisateurs = this.userservice.users;
  selectedUtilisateur = signal<Utilisateur | null>(null);
  selectedUtilisateurName = computed(() => this.selectedUtilisateur()?._id);

  constructor() {
    effect(() => {
      console.log('Utilisateurs  :', this.users());
      console.log('Utilisateur sélectionné :', this.selectedUtilisateur());
    });
  }

  selectUtilisateur(utilisateurName: Utilisateur) {
    // const newUtilisateur = this.utilisateurs().find(({ nom }) => nom === utilisateurName);
    if (utilisateurName) {
      this.selectedUtilisateur.set(utilisateurName);
    }
  }
}
