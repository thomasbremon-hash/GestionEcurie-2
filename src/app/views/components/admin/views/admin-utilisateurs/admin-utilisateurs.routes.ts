import { Routes } from '@angular/router';
import { AdminUtilisateurs } from './admin-utilisateurs';
import { ListeUtilisateurs } from './utilisateurs-liste/utilisateurs-liste';
import { UtilisateursForm } from './utilisateurs-form/utilisateurs-form';

export const routes: Routes = [
  {
    path: '',
    component: AdminUtilisateurs,
    children: [
      {
        path: 'list',
        component: ListeUtilisateurs,
      },
      {
        path: 'new',
        component: UtilisateursForm,
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
    ],
  },
];
