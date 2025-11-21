import { Component, inject } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-email.html',
  styleUrl: './register-email.scss',
})
export class RegisterEmail {
 

  sessionService = inject(SessionService);
  authService = inject(AuthService);
  userService = inject(UtilisateurService);
  router = inject(Router);
 
  email = '';

  userConnected = this.authService.utilisateur;

  utilisateur = this.userService.utilisateur;

  uid = this.userService.utilisateurID;

  userExist = this.userService.userExits;

  async onRegisterEmail() {
    console.log('enregistrement avec email en cours');
    await this.authService.invitation(this.email);
    console.log('user connected ? :', this.userConnected());
  }
}
