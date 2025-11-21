import { computed, inject, Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from 'express';
import { AuthService } from '../auth/auth.service';
import { UtilisateurService } from './utilisateur.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private authService = inject(AuthService);
  private userService = inject(UtilisateurService);

  auser = this.authService.utilisateur;
  uuser = this.userService.utilisateur;
  uuserExist = this.userService.userExits;
  uid = this.userService.utilisateurID;

  /*  
  auserChanged = computed(async () => {
    this.uid.set(this.auser()!.uid);
    if ((await this.uuserExist()).valueOf() === false && this.auser() !== null) {
      this.userService.addUser({
        email: this.auser()?.email!,
        _id: this.auser()?.uid!,
      });
    }
  });*/
}
