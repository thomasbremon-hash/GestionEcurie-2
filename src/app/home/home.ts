import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../features/auth/auth.service';
import { UtilisateurService } from '../features/utilisateurs/utilisateur.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
})
export class Home {
  auth = inject(AuthService);
  userservice = inject(UtilisateurService);
  user = this.auth.utilisateur;

  users = this.userservice.users;

  constructor() {
    /* effect(() => {
      console.log("user connecté",  this.user());
    }); */
  }
}
