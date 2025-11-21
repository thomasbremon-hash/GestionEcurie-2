import { Routes } from '@angular/router';
import { AdminUtilisateurs } from './admin-utilisateurs';
import { ListeUtilisateurs } from '../utilisateurs-liste/utilisateurs-liste';
import { UtilisateursForm } from '../utilisateurs-form/utilisateurs-form';
import { Utilisateurs } from '../utilisateurs/utilisateurs';

export const routes: Routes = [
  {
    path: '',
    component: Utilisateurs,
  },
  {
    path: 'new',
    component: UtilisateursForm,
  },

  {
    path: 'list',
    component: Utilisateurs,
  },

  {
    path: ':utilisateurId/edit',
    component: UtilisateursForm,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
