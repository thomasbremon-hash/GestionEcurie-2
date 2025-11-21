import { Component, effect, inject, signal } from '@angular/core';
import { EntrepriseService } from '../../../../../../services/entreprises.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdresseForm } from '../../../../../../forms/adresseForm/adresse-form';
import { Entreprise } from '../../../../../../interface/entreprise';
import { EntrepriseBase } from '../../../../../../forms/entreprise-base/entreprise-base';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entreprises-form',
  imports: [CommonModule, ReactiveFormsModule, AdresseForm, EntrepriseBase],
  templateUrl: './entreprises-form.html',
  styleUrl: './entreprises-form.scss',
})
export class EntreprisesForm {
  entrepriseService = inject(EntrepriseService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // ID de l'utilisateur en mode édition
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
