import { Component, computed, effect, inject, signal } from '@angular/core';
import { ChevalService } from '../chevaux.service';
import { Router } from '@angular/router';
import { Cheval } from '../cheval';
import { ChevauxListe } from '../chevaux-liste/chevaux-liste';
import { ChevauxDetails } from '../chevaux-details/chevaux-details';

@Component({
  selector: 'app-chevaux',
  imports: [ChevauxListe, ChevauxDetails],
  templateUrl: './chevaux.html',
  styleUrl: './chevaux.scss',
})
export class Chevaux {
  chevalservice = inject(ChevalService);
  router = inject(Router);

  lesChevaux = this.chevalservice.lesChevaux;
  selectedCheval = signal<Cheval | null>(null);
  selectedChevalName = computed(() => this.selectedCheval()?._id);

  constructor() {
    effect(() => {
      console.log('Chevaux  :', this.lesChevaux());
      console.log('Cheval sélectionné :', this.selectedCheval());
    });

    this.chevalservice.chevauxResource.reload();
  }
  selectCheval(chevalName: Cheval) {
    if (chevalName) {
      this.selectedCheval.set(chevalName);
    }
  }
}
