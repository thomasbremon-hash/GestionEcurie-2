import { Component, inject, effect, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';

import { UserBase } from '../../../forms/user-base/user-base';
import { AdresseForm } from '../../adresseForm/adresse-form';
import { Utilisateur } from '../user';
import { Adresse } from '../../adresseForm/adresse-interface';

@Component({
  selector: 'app-ajouter-utilisateur',
  standalone: true,
  imports: [ReactiveFormsModule, UserBase, AdresseForm],
  templateUrl: './utilisateurs-form.html',
  styleUrl: './utilisateurs-form.scss',
})
export class UtilisateursForm {
  // Services
  userService = inject(UtilisateurService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // ID de l'utilisateur en mode édition
  utilisateurId = signal<string | null>(null);

  // 🟣 Formulaire complet avec bon typage
  utilisateurForm = new FormGroup({
    userBase: new FormControl<{
      prenom: string;
      nom: string;
      email: string;
      roles: string[];
    } | null>(null, Validators.required),

    adresse: new FormControl<{
      rue: string;
      ville: string;
      cp: string;
      pays: string;
    } | null>(null, Validators.required),
  });

  constructor() {
    // 🔍 Récupération de l'ID dans l'URL
    effect(() => {
      const id = this.route.snapshot.paramMap.get('utilisateurId');

      this.utilisateurId.set(id);

      if (id) this.loadUser(id); // Mode édition
    });
  }

  // 🟦 Charger les données de l'utilisateur et pré-remplir le formulaire
  async loadUser(id: string) {
    try {
      const data = await this.userService.getUser(id);

      this.utilisateurForm.patchValue({
        userBase: {
          prenom: data.prenom,
          nom: data.nom,
          email: data.email,
          roles: data.roles,
        },
        adresse: {
          rue: data.adresse?.rue,
          ville: data.adresse?.ville,
          cp: data.adresse?.cp,
          pays: data.adresse?.pays,
        },
      });
    } catch (err) {
      console.error('❌ Erreur chargement utilisateur :', err);
    }
  }

  // 🟢 Formulaire soumis
  async submit() {
    if (this.utilisateurForm.invalid) {
      this.utilisateurForm.markAllAsTouched();
      console.warn('Formulaire invalide');
      return;
    }

    const formValue = this.utilisateurForm.value;
    if (!formValue.userBase || !formValue.adresse) return;

    const { prenom, nom, email, roles } = formValue.userBase;
    const { rue, ville, cp, pays } = formValue.adresse;

    const newUser: Partial<Utilisateur> = {
      prenom,
      nom,
      email,
      roles,
      adresse: {
        rue,
        ville,
        cp,
        pays,
      },
    };

    const id = this.utilisateurId();

    try {
      if (id) {
        // 🔵 MODE ÉDITION
        await this.userService.updateUser(id, { _id: id, ...newUser });
        console.log('📝 Utilisateur mis à jour');
      } else {
        // 🟢 MODE AJOUT
        await this.userService.addUser(newUser);
        console.log('➕ Utilisateur ajouté');
      }

      // Rafraîchir la liste
      this.userService.refreshUsers();

      // Retour Liste
      await this.router.navigate(['/admin/utilisateurs']);
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde :', err);
    }
  }

  // Pour changer le titre (facultatif)
  isEditMode() {
    return this.utilisateurId() !== null;
  }
}
