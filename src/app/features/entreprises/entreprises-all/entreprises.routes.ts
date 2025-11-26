import { Routes } from '@angular/router';
import { Entreprises } from './entreprises';
import { EntreprisesListe } from '../entreprises-liste/entreprises-liste';
import { EntreprisesForm } from '../entreprises-form/entreprises-form';

export const routes: Routes = [
  {
    path: 'list',
    component: Entreprises,
  },
  {
    path: 'new',
    component: EntreprisesForm,
  },

  {
    path: 'list',
    component: Entreprises,
  },

  {
    path: ':entrepriseId/edit',
    component: EntreprisesForm,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
