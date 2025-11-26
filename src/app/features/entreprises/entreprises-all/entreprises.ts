import { Component, computed, effect, inject, signal } from '@angular/core';
import { EntreprisesListe } from '../entreprises-liste/entreprises-liste';
import { EntreprisesDetails } from '../entreprises-details/entreprises-details';
import { Entreprise } from '../entreprise-data';
import { EntrepriseService } from '../entreprises.service';
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

  lesEntreprises = this.entrepriseservice.lesEntreprises;
  selectedEntreprise = signal<Entreprise | null>(null);
  selectedEntrepriseName = computed(() => this.selectedEntreprise()?._id);

  constructor() {
    effect(() => {
      console.log('Entreprises  :', this.lesEntreprises());
      console.log('Entreprise sélectionné :', this.selectedEntreprise());
    });

    this.entrepriseservice.entreprisesResource.reload();
  }
  selectEntreprise(entrepriseName: Entreprise) {
    // const newUtilisateur = this.utilisateurs().find(({ nom }) => nom === utilisateurName);
    if (entrepriseName) {
      this.selectedEntreprise.set(entrepriseName);
    }
  }
}
