import { Component, computed, inject, signal } from '@angular/core';
import { EntreprisesListe } from './entreprises-liste/entreprises-liste';
import { EntreprisesDetails } from './entreprises-details/entreprises-details';
import { Entreprise } from '../../../../../interface/entreprise';
import { EntrepriseService } from '../../../../../services/entreprises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprises',
  imports: [EntreprisesListe, EntreprisesDetails],
  templateUrl: './entreprises.html',
  styleUrl: './entreprises.scss',
})
export class Entreprises {
  entrepriseservice = inject(EntrepriseService);
  router = inject(Router);
  entreprises = this.entrepriseservice.entreprises;
  selectedEntreprise = signal<Entreprise | null>(null);
  selectedEntrepriseName = computed(() => this.selectedEntreprise()?._id);

  selectEntreprise(entrepriseName: Entreprise) {
    // const newUtilisateur = this.utilisateurs().find(({ nom }) => nom === utilisateurName);
    if (entrepriseName) {
      this.selectedEntreprise.set(entrepriseName);
    }
  }
}
