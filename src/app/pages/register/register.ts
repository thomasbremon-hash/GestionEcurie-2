import { Component, inject, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  sessionService = inject(SessionService);
  authService = inject(AuthService);
  userService = inject(UtilisateurService);
  router = inject(Router);

  userConnected = this.authService.utilisateur;

  utilisateur = this.userService.utilisateur;

  uid = this.userService.utilisateurID;

  userExist = this.userService.userExits;

  constructor() {
    effect(async () => {
      this.uid.set(this.userConnected()!.uid);
      console.log('user connected effect : ', this.userExist());
      if ((await this.userExist()).valueOf() === false) {
        this.userService.addUser({
          displayName: '',
          email: this.email,
          _id: this.userConnected()?.uid,
        });
      }
    });
  }

  async onRegister() {
    console.log('enregistreùment en cours');
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    try {
      await this.authService.register(this.email, this.password);
      console.log('user connected ? :', this.userConnected());

      /*    if (this.userConnected()?.uid !== null) {
               this.successMessage = 'Inscription réussie ! Redirection...';
              
          console.log("les  user",  this.userService.fetchUtilisateurs());
        // redirection ici, après succès
          this.router.navigate(['/']);
        }*/
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }
}
