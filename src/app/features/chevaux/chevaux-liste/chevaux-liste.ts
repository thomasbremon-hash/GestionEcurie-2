import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { Cheval } from '../cheval';
import { ChevalService } from '../chevaux.service';

@Component({
  selector: 'app-chevaux-liste',
  imports: [],
  templateUrl: './chevaux-liste.html',
  styleUrl: './chevaux-liste.scss',
})
export class ChevauxListe {
  chevalservice = inject(ChevalService);
  router = inject(Router);

  lesChevaux = input<Cheval[]>([]);
  selectedCheval = input<Cheval | null>(null);

  selectCheval = output<Cheval>();
}
