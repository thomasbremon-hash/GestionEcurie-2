import { Routes } from '@angular/router';
import { Admin } from '../admin/admin';
import { AdminUtilisateurs } from '../views/admin-utilisateurs/admin-utilisateurs';
import { AdminEntreprises } from '../views/entreprises/admin-entreprises';

export const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'utilisateurs',
        loadComponent: async () =>
          (await import('../views/admin-utilisateurs/admin-utilisateurs')).AdminUtilisateurs,
        loadChildren: async () =>
          (await import('../views/admin-utilisateurs/admin-utilisateurs.routes')).routes,
      },
      {
        path: 'entreprises',
        loadComponent: async () =>
          (await import('../views/entreprises/admin-entreprises')).AdminEntreprises,
        loadChildren: async () => (await import('../views/entreprises/entreprises.routes')).routes,
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
