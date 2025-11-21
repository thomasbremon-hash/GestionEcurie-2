import { Component, effect, inject, input, NgZone, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from '../utilisateur.service';
import { Utilisateur } from '../user';
import { SessionService } from '../session.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdresseForm } from '../../adresseForm/adresse-form';
import { UserBase } from '../../../forms/user-base/user-base';

@Component({
  selector: 'app-utilisateurs-detail',
  imports: [ReactiveFormsModule, UserBase, AdresseForm],
  templateUrl: './utilisateurs-detail.html',
  styleUrl: './utilisateurs-detail.scss',
})
export class UtilisateursDetail {
  user = input<Utilisateur | null>();
  sessionService = inject(SessionService);
  userService = inject(UtilisateurService);
  router = inject(Router);
  private zone = inject(NgZone);

  utilisateur = this.userService.utilisateur;

  uid = this.userService.utilisateurID;

  userExist = this.userService.userExits;

  // constructor() {
  //   effect(() => {
  //     console.log('Détails utilisateur :', this.user);
  //   });
  // }

  async deleteUser() {
    try {
      const currentUser = this.user();
      if (currentUser && currentUser._id) {
        await this.userService.deleteContact(currentUser._id);
        console.log('✅ Utilisateur supprimé avec succès');

        // Rafraîchir la liste d'utilisateurs
        this.userService.refreshUsers();

        // Rediriger vers la liste
        this.zone.run(() => this.router.navigate(['/admin/utilisateurs']));
      }
    } catch (err) {
      console.error('❌ Erreur suppression utilisateur :', err);
    }
  }
  async updateUser() {
    try {
      const currentUser = this.user();
      if (currentUser && currentUser._id) {
        await this.userService.updateUser(currentUser._id, currentUser);
        console.log('✅ Utilisateur mis à jour avec succès');
        // Rafraîchir la liste d'utilisateurs
        this.userService.refreshUsers();
      }
    } catch (err) {
      console.error('❌ Erreur mise à jour utilisateur :', err);
    }
  }

  goToEdit() {
    const currentUser = this.user();
    if (!currentUser?._id) return;

    this.router.navigate([`/admin/utilisateurs/${currentUser._id}/list`]);
  }

  // Services
  route = inject(ActivatedRoute);

  // ID de l'utilisateur en mode édition
  utilisateurId = signal<string | null>(null);

  // 🟣 Formulaire complet avec bon typage
  utilisateurForm = new FormGroup({
    userBase: new FormControl<{
      prenom: string;
      nom: string;
      email: string;
    } | null>(null, Validators.required),

    adresse: new FormControl<{
      rue: string;
      ville: string;
      cp: string;
      pays: string;
    } | null>(null, Validators.required),
  });

  constructor() {
    // 🔍 Récupération de l'ID dans l'URL (mode édition via URL)
    effect(() => {
      const id = this.route.snapshot.paramMap.get('utilisateurId');
      this.utilisateurId.set(id);
      if (id) this.loadUser(id);
    });

    // 🔥 Réagit aux changements de l'input [user]
    effect(() => {
      const u = this.user();

      if (u) {
        this.utilisateurForm.patchValue({
          userBase: {
            prenom: u.prenom,
            nom: u.nom,
            email: u.email,
          },
          adresse: {
            rue: u.rue,
            ville: u.ville,
            cp: u.cp,
            pays: u.pays,
          },
        });
      } else {
        // Nouveau : reset si aucun utilisateur sélectionné
        this.utilisateurForm.reset();
      }
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
        },
        adresse: {
          rue: data.rue,
          ville: data.ville,
          cp: data.cp,
          pays: data.pays,
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
    };

    const id = this.user()?._id;

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
