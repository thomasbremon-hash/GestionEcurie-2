import { Component, effect, inject, input, NgZone, signal } from '@angular/core';
import { Entreprise } from '../entreprise-data';
import { EntrepriseService } from '../entreprises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdresseForm } from '../../adresseForm/adresse-form';
import { EntrepriseBase } from '../../../forms/entreprise-base/entreprise-base';

@Component({
  selector: 'app-entreprises-details',
  imports: [ReactiveFormsModule, EntrepriseBase, AdresseForm],
  templateUrl: './entreprises-details.html',
  styleUrl: './entreprises-details.scss',
})
export class EntreprisesDetails {
  uneEntreprise = input<Entreprise | null>();
  entrepriseService = inject(EntrepriseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private zone = inject(NgZone);

  entreprise = this.entrepriseService.entreprise;

  eid = this.entrepriseService.entrepriseID;

  entrepriseExists = this.entrepriseService.entrepriseExits;

  async deleteEntreprise() {
    try {
      const currentEntreprise = this.uneEntreprise();
      if (currentEntreprise && currentEntreprise._id) {
        await this.entrepriseService.deleteEntreprise(currentEntreprise._id);
        console.log('✅ Entreprise supprimé avec succès');

        // Rafraîchir la liste des entreprises
        this.entrepriseService.refreshEntreprises();

        // Rediriger vers la liste
        this.zone.run(() => this.router.navigate(['/admin/entreprises']));
      }
    } catch (err) {
      console.error('❌ Erreur suppression entreprise :', err);
    }
  }
  async updateEntreprise() {
    try {
      const currentEntreprise = this.uneEntreprise();
      if (currentEntreprise && currentEntreprise._id) {
        await this.entrepriseService.updateEntreprise(currentEntreprise._id, currentEntreprise);
        console.log('✅ entreprise mis à jour avec succès');
        // Rafraîchir la liste d'utilisateurs
        this.entrepriseService.refreshEntreprises();
      }
    } catch (err) {
      console.error('❌ Erreur mise à jour entreprise :', err);
    }
  }

  goToEdit() {
    const currentEntreprise = this.uneEntreprise();
    if (!currentEntreprise?._id) return;

    this.router.navigate([`/admin/entreprises/${currentEntreprise._id}/edit`]);
  }

  entrepriseId = signal<string | null>(null);

  // 🟣 Formulaire complet avec bon typage
  entrepriseForm = new FormGroup({
    entrepriseFormBase: new FormControl<{
      nom: string;
      email: string;
      siret: string;
      siren: string;
      telephone: string;
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
      const id = this.route.snapshot.paramMap.get('entrepriseId');

      this.entrepriseId.set(id);

      if (id) this.loadEntreprise(id); // Mode édition
    });

    // 🔥 Réagit aux changements de l'input [user]
    effect(() => {
      const e = this.uneEntreprise();

      if (e) {
        this.entrepriseForm.patchValue({
          entrepriseFormBase: {
            nom: e.nom,
            email: e.email,
            siret: e.siret,
            siren: e.siren,
            telephone: e.telephone,
          },
          adresse: {
            rue: e.rue,
            ville: e.ville,
            cp: e.cp,
            pays: e.pays,
          },
        });
      } else {
        // Nouveau : reset si aucun utilisateur sélectionné
        this.entrepriseForm.reset();
      }
    });

    effect(() => {
      const e = this.uneEntreprise();
      this.entrepriseId.set(e?._id ?? null);
    });
  }

  // 🟦 Charger les données de l'utilisateur et pré-remplir le formulaire
  async loadEntreprise(id: string) {
    try {
      const data = await this.entrepriseService.getEntreprise(id);

      this.entrepriseForm.patchValue({
        entrepriseFormBase: {
          nom: data.nom,
          email: data.email,
          siret: data.siret,
          siren: data.siren,
          telephone: data.telephone,
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
    if (this.entrepriseForm.invalid) {
      this.entrepriseForm.markAllAsTouched();
      console.warn('Formulaire invalide');
      return;
    }

    const formValue = this.entrepriseForm.value;
    console.log(this.entrepriseForm.value);
    if (!formValue.entrepriseFormBase || !formValue.adresse) return;

    const { nom, email, siret, telephone, siren } = formValue.entrepriseFormBase;
    const { rue, ville, cp, pays } = formValue.adresse;

    const newEntreprise: Partial<Entreprise> = {
      nom,
      siret,
      siren,
      telephone,
      email,
      rue,
      ville,
      cp,
      pays,
    };

    const id = this.entrepriseId();

    try {
      if (id) {
        // 🔵 MODE ÉDITION
        await this.entrepriseService.updateEntreprise(id, { _id: id, ...newEntreprise });
        console.log('📝 Utilisateur mis à jour');
      } else {
        // 🟢 MODE AJOUT
        await this.entrepriseService.addEntreprise(newEntreprise);
        console.log('➕ Utilisateur ajouté');
      }

      // Rafraîchir la liste
      this.entrepriseService.refreshEntreprises();

      // Retour Liste
      await this.router.navigate(['/admin/entreprises']);
    } catch (err) {
      console.error('❌ Erreur lors de la sauvegarde :', err);
    }
  }

  // Pour changer le titre (facultatif)
  isEditMode() {
    return this.entrepriseId() !== null;
  }
}
