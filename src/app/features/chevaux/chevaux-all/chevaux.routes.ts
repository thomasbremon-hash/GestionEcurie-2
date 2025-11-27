import { Routes } from '@angular/router';
import { Chevaux } from './chevaux';
import { ChevauxForm } from '../chevaux-form/chevaux-form';

export const routes: Routes = [
  {
    path: 'list',
    component: Chevaux,
  },
  {
    path: 'new',
    component: ChevauxForm,
  },

  {
    path: 'list',
    component: Chevaux,
  },

  {
    path: ':chevalId/edit',
    component: ChevauxForm,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
