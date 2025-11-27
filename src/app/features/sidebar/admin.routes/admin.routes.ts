import { Routes } from '@angular/router';
import { Admin } from '../admin/admin';
import { AdminUtilisateurs } from '../../utilisateurs/admin-utilisateurs/admin-utilisateurs';
import { AdminEntreprises } from '../../entreprises/entreprises-all/admin-entreprises';

export const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'utilisateurs',
        loadComponent: async () =>
          (await import('../../utilisateurs/admin-utilisateurs/admin-utilisateurs'))
            .AdminUtilisateurs,
        loadChildren: async () =>
          (await import('../../utilisateurs/admin-utilisateurs/admin-utilisateurs.routes')).routes,
      },
      {
        path: 'entreprises',
        loadComponent: async () =>
          (await import('../../entreprises/entreprises-all/admin-entreprises')).AdminEntreprises,
        loadChildren: async () =>
          (await import('../../entreprises/entreprises-all/entreprises.routes')).routes,
      },

      {
        path: 'chevaux',
        loadComponent: async () =>
          (await import('../../chevaux/chevaux-all/admin-chevaux')).AdminChevaux,
        loadChildren: async () => (await import('../../chevaux/chevaux-all/chevaux.routes')).routes,
      },

      // {
      //   path: 'entreprises',
      //   component: AdminCocktailsComponent,
      // },
      // {
      //   path: 'chevaux',
      //   component: AdminCocktailsComponent,
      // },

      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
