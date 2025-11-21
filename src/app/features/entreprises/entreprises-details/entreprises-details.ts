import { Component, effect, inject, input, NgZone } from '@angular/core';
import { Entreprise } from '../entreprise-data';
import { EntrepriseService } from '../entreprises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprises-details',
  imports: [],
  templateUrl: './entreprises-details.html',
  styleUrl: './entreprises-details.scss',
})
export class EntreprisesDetails {
  uneEntreprise = input<Entreprise | null>();
  entrepriseservice = inject(EntrepriseService);
  router = inject(Router);
  private zone = inject(NgZone);

  entreprise = this.entrepriseservice.entreprise;

  entrepriseExists = this.entrepriseservice.entrepriseExits;

  constructor() {
    effect(() => {
      console.log('Détails entreprise :', this.entreprise);
    });
  }

  async deleteEntreprise() {
    try {
      const currentEntreprise = this.uneEntreprise();
      if (currentEntreprise && currentEntreprise._id) {
        await this.entrepriseservice.deleteEntreprise(currentEntreprise._id);
        console.log('✅ Entreprise supprimé avec succès');

        // Rafraîchir la liste des entreprises
        this.entrepriseservice.refreshEntreprises();

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
        await this.entrepriseservice.updateEntreprise(currentEntreprise._id, currentEntreprise);
        console.log('✅ entreprise mis à jour avec succès');
        // Rafraîchir la liste d'utilisateurs
        this.entrepriseservice.refreshEntreprises();
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
}
