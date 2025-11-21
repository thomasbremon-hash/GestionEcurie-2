import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UtilisateurService } from '../../../../services/utilisateur.service';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../../../../interface/user';
import { sendEmailVerification } from '@angular/fire/auth';

@Component({
  selector: 'app-liste-utilisateurs',
  imports: [],
  templateUrl: './liste-utilisateurs.html',
  styleUrl: './liste-utilisateurs.scss',
})
export class ListeUtilisateurs {
  auth = inject(AuthService);
  userservice = inject(UtilisateurService);
  user = this.auth.utilisateur;
  router = inject(Router);
  users = this.userservice.users;

  // manageAccesss(user: Utilisateur) {
  //   const password = 'temp1234'; // mot de passe temporaire, pas vraiment utilisé

  //   this.auth
  //     .register(user.email, password)
  //     .then(async (u) => {
  //       user.uid = u.user.uid;
  //       user.emailVerified = u.user.emailVerified;

  //       // 🔹 Met à jour les infos dans Firestore
  //       await this.userservice.updateUser(user);
  //       console.log('✅ Utilisateur ajouté dans Firestore');

  //       // 🔹 Envoie l’email de réinitialisation
  //       await this.auth.sendPasswordReset(user.email);
  //       console.log('📨 Email de réinitialisation envoyé à', user.email);

  //       alert(`Un email de création de mot de passe a été envoyé à ${user.email}`);
  //     })
  //     .catch((err) => {
  //       console.error('❌ Erreur création utilisateur :', err.message);
  //       alert(`Erreur : ${err.message}`);
  //     });
  // }
}
