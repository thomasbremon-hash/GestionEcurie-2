import { Component, effect, inject, input, NgZone, signal } from '@angular/core';
import { Cheval } from '../cheval';
import { ChevalService } from '../chevaux.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChevalBase } from '../../../forms/cheval-form/cheval-base';

@Component({
  selector: 'app-chevaux-details',
  imports: [ReactiveFormsModule, ChevalBase],
  templateUrl: './chevaux-details.html',
  styleUrl: './chevaux-details.scss',
})
export class ChevauxDetails {
  unCheval = input<Cheval | null>();
  chevalService = inject(ChevalService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private zone = inject(NgZone);

  cheval = this.chevalService.cheval;

  cid = this.chevalService.chevalID;

  entrepriseExists = this.chevalService.chevalExits;

  async deleteCheval() {
    try {
      const currentCheval = this.unCheval();
      if (currentCheval && currentCheval._id) {
        await this.chevalService.deleteCheval(currentCheval._id);
        console.log('✅ Cheval supprimé avec succès');

        // Rafraîchir la liste des entreprises
        this.chevalService.refreshChevaux();

        // Rediriger vers la liste
        this.zone.run(() => this.router.navigate(['/admin/chevaux']));
      }
    } catch (err) {
      console.error('❌ Erreur suppression cheval :', err);
    }
  }
  async updateCheval() {
    try {
      const currentCheval = this.unCheval();
      if (currentCheval && currentCheval._id) {
        await this.chevalService.updateCheval(currentCheval._id, currentCheval);
        console.log('✅ Cheval mis à jour avec succès');
        // Rafraîchir la liste d'utilisateurs
        this.chevalService.refreshChevaux();
      }
    } catch (err) {
      console.error('❌ Erreur mise à jour cheval :', err);
    }
  }

  goToEdit() {
    const currentCheval = this.unCheval();
    if (!currentCheval?._id) return;

    this.router.navigate([`/admin/chevaux/${currentCheval._id}/edit`]);
  }

  chevalId = signal<string | null>(null);

  // 🟣 Formulaire complet avec bon typage
  chevalForm = new FormGroup({
    chevalFormBase: new FormControl<{
      nom: string;
      dateNaissance: string;
    } | null>(null, Validators.required),
  });

  constructor() {
    // 🔍 Récupération de l'ID dans l'URL
    effect(() => {
      const id = this.route.snapshot.paramMap.get('chevalId');

      this.chevalId.set(id);

      if (id) this.loadCheval(id); // Mode édition
    });

    // 🔥 Réagit aux changements de l'input [user]
    effect(() => {
      const c = this.unCheval();

      if (c) {
        this.chevalForm.patchValue({
          chevalFormBase: {
            nom: c.nom,
            dateNaissance: c.dateNaissance,
          },
        });
      } else {
        // Nouveau : reset si aucun utilisateur sélectionné
        this.chevalForm.reset();
      }
    });

    effect(() => {
      const c = this.unCheval();
      this.chevalId.set(c?._id ?? null);
    });
  }

  // 🟦 Charger les données de l'utilisateur et pré-remplir le formulaire
  async loadCheval(id: string) {
    try {
      const data = await this.chevalService.getCheval(id);

      this.chevalForm.patchValue({
        chevalFormBase: {
          nom: data.nom,
          dateNaissance: data.dateNaissance,
        },
      });
    } catch (err) {
      console.error('❌ Erreur chargement cheval :', err);
    }
  }

  // 🟢 Formulaire soumis
  async submit() {
    if (this.chevalForm.invalid) {
      this.chevalForm.markAllAsTouched();
      console.warn('Formulaire invalide');
      return;
    }

    const formValue = this.chevalForm.value;
    console.log(this.chevalForm.value);
    if (!formValue.chevalFormBase) return;

    const { nom, dateNaissance } = formValue.chevalFormBase;

    const newCheval: Partial<Cheval> = {
      nom,
      dateNaissance,
    };

    const id = this.chevalId();

    try {
      if (id) {
        // 🔵 MODE ÉDITION
        await this.chevalService.updateCheval(id, { _id: id, ...newCheval });
        console.log('📝 Utilisateur mis à jour');
      } else {
        // 🟢 MODE AJOUT
        await this.chevalService.addCheval(newCheval);
        console.log('➕ Cheval ajouté');
      }

      // Rafraîchir la liste
      this.chevalService.refreshChevaux();

      // Retour Liste
      await this.router.navigate(['/admin/chevaux']);
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde :', err);
    }
  }

  // Pour changer le titre (facultatif)
  isEditMode() {
    return this.chevalId() !== null;
  }
}
