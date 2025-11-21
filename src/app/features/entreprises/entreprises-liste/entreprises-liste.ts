import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from '../entreprise-data';
import { EntrepriseService } from '../entreprises.service';

@Component({
  selector: 'app-entreprises-liste',
  imports: [],
  templateUrl: './entreprises-liste.html',
  styleUrl: './entreprises-liste.scss',
})
export class EntreprisesListe {
  entrepriseservce = inject(EntrepriseService);
  router = inject(Router);

  entreprises = input<Entreprise[]>([]);
  selectedEntreprise = input<Entreprise | null>(null);

  selectEntreprise = output<Entreprise>();
}
