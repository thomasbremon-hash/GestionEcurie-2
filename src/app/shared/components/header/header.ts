import { Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { UtilisateurService } from '../../../features/utilisateurs/utilisateur.service';
import { Utilisateur } from '../../../features/utilisateurs/user';

interface MenuLink {
  path: string;
  name: string;
  roles: string[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  private auth = inject(AuthService);
  private utilisateurService = inject(UtilisateurService);

  auser = this.auth.utilisateur ;

 // user = this.utilisateurService.utilisateur;

  utilisateur  = this.utilisateurService.utilisateur;


      
  isConnected = computed(() => {
    if(this.auth.isLoggedIn()){

      console.log("je recherche l utilisateur connected ")
     this.utilisateurService.getUserByUidOrEmail(this.auser()!.uid)  
    }
     
    
    
    return !!this.auth.utilisateur()});
//  isFirestoreReady = computed(() => !!this.utilisateur());
utilisateurt = computed(() =>  { 
  if(this.isConnected()){
    console.log("je recherche l utilisateur ")
     this.utilisateurService.getUserByUidOrEmail(this.auser()!.uid)  
  }
})

  // Tous les liens possibles
  allLinks: MenuLink[] = [
    { path: '/admin', name: 'Admin', roles: ['admin'] },
    { path: '/gestionnaire', name: 'Gestionnaire', roles: ['gestionnaire'] },
    { path: '/client', name: 'Client', roles: ['client'] },
    { path: '/collaborateur', name: 'Collaborateur', roles: ['collaborateur'] },
    { path: '/comptabilite', name: 'Comptabilité', roles: ['comptabilite'] },
  ];

  // Computed pour filtrer les liens selon les rôles
  menuLinks = computed(() => {
    const user = this.utilisateur(); // ✅ Appel du signal
    if (!this.isConnected()) return [];
    return this.allLinks.filter((link) => link.roles.some((role) => user!.roles.includes(role)));
  });

  constructor() {
 
  }

  logout() {
    this.auth.logout();
  }
}
