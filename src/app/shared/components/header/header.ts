import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { UtilisateurService } from '../../../features/utilisateurs/utilisateur.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  private auth = inject(AuthService);
  private utilisateurService = inject(UtilisateurService);

  utilisateurID = signal(null)

  utilisateur = this.utilisateurService.utilisateur;

  // userRoles: WritableSignal<string[]> = signal([]);
 
  isConnected = computed(() => !!this.auth.utilisateur());

  constructor() {
    effect(() => {
        console.log(this.auth.utilisateur()?.uid);
        console.log(this.isConnected());
        if(this.isConnected().valueOf()){
          console.log("user connected");
           console.log(this.utilisateurService.utilisateurID?.set(this.auth.utilisateur()!.uid ));
          console.log(this.utilisateur())
        }

        

   
    });
  }

  hasRole(role: string) {
    console.log(this.utilisateur()?.roles)
   console.log(this.utilisateur()?.roles.includes(role));
   return this.utilisateur()?.roles.includes(role)
  }

  logout() {
    this.auth.logout();
  }
}
