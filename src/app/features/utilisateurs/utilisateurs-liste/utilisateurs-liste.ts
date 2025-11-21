import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../user';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-utilisateurs-liste',
  imports: [],
  templateUrl: './utilisateurs-liste.html',
  styleUrl: './utilisateurs-liste.scss',
})
export class ListeUtilisateurs {
  auth = inject(AuthService);
  userservice = inject(UtilisateurService);
  user = this.auth.utilisateur;
  router = inject(Router);

  users = input<Utilisateur[]>([]);
  selectedUtilisateur = input<Utilisateur | null>(null);

  selectUser = output<Utilisateur>();
  active: any;

  async manageAccesss(user: Utilisateur) {
    const password = 'temp1234'; // mot de passe temporaire, pas vraiment utilisé

    try {
      const u = await this.auth.register(user.email, password);
      user.uid = u.user.uid;
      user.emailVerified = u.user.emailVerified;

      // 🔹 Met à jour les infos dans Firestore (version corrigée)
      await this.userservice.updateUser(user._id!, { ...user });
      console.log('✅ Utilisateur ajouté dans Firestore');

      // 🔹 Envoie l’email de réinitialisation
      await this.auth.sendPasswordReset(user.email);
      console.log('📨 Email de réinitialisation envoyé à', user.email);

      alert(`Un email de création de mot de passe a été envoyé à ${user.email}`);
    } catch (err: any) {
      console.error('❌ Erreur création utilisateur :', err.message);
      alert(`Erreur : ${err.message}`);
    }
  }
}
