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
  entrepriseservice = inject(EntrepriseService);
  router = inject(Router);

  lesEntreprises = input<Entreprise[]>([]);
  selectedEntreprise = input<Entreprise | null>(null);

  selectEntreprise = output<Entreprise>();
}
