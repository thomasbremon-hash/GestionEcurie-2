import { Component, inject} from '@angular/core';
import {
  FormControl,
  FormGroup,
  
  ReactiveFormsModule,
  
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { UtilisateurService } from '../../../../services/utilisateur.service';
import { SessionService } from '../../../../services/session.service';
import { UserBase } from '../../../../forms/user-base/user-base';
import { AdresseForm } from '../../../../forms/adresseForm/adresse-form';
import { Utilisateur } from '../../../../interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-utilisateur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserBase, AdresseForm],
  templateUrl: './ajouter-utilisateur.html',
  styleUrls: ['./ajouter-utilisateur.scss'],
})
export class AjouterUtilisateur {
  sessionService = inject(SessionService);
userService = inject(UtilisateurService);
router = inject(Router);


  utilisateurForm = new FormGroup({
    userBase: new FormControl(null, [Validators.required]),
    adresse: new FormControl(null, [Validators.required]),
  });

  // userConnected = this.authService.utilisateur;

  utilisateur = this.userService.utilisateur;

  uid = this.userService.utilisateurID;

  userExist = this.userService.userExits;

  async submit() {
    if (this.utilisateurForm.invalid) {
      this.utilisateurForm.markAllAsTouched();
      console.warn('Formulaire invalide');
      return;
    }

    const formValue = this.utilisateurForm.value;
    if (!formValue.userBase || !formValue.adresse) return;

    const { prenom, nom, email } = formValue.userBase;
    const { rue, ville, cp, pays } = formValue.adresse;

    const newUser: Partial<Utilisateur> = {
      prenom,
      nom,
      email,
      rue,
      ville,
      cp,
      pays,
      dateNaissance: new Date().toISOString(),
      emailVerified: false,
    };

    console.log('Création utilisateur :', newUser);

    try {
      await this.userService.addUser(newUser);
      console.log('✅ Utilisateur créé avec succès');
      await this.router.navigate(['/liste-utilisateurs']);
    } catch (err) {
      console.error('❌ Erreur création Firestore :', err);
    }
  }

  constructor() {
    /*  effect(async () => {
      this.uid.set(this.userConnected()!.uid);
      console.log('user connected effect : ', this.userExist());
      if ((await this.userExist()).valueOf() === false) {
        this.userService.addUser({
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          rue: this.rue,
          ville: this.ville,
          cp: this.cp,
          dateNaissance: this.dateNaissance,
          
        });
      }
    });*/
  }

  // async onRegister() {
  //   console.log('enregistreùment en cours');

  //   await this.userService.addUser({
  //     prenom: this.prenom,
  //     nom: this.nom,
  //     email: this.email,
  //     rue: this.rue,
  //     ville: this.ville,
  //     cp: this.cp,
  //     dateNaissance: this.dateNaissance,
  //   });
  //   //  console.log('user connected ? :', this.userConnected());
  // }
}
