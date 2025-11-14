import { Routes } from '@angular/router';
import { Admin } from '../admin/admin';
import { AdminUtilisateurs } from '../views/admin-utilisateurs/admin-utilisateurs';

export const routes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'utilisateurs',
        loadChildren: async () =>
          (await import('../views/admin-utilisateurs/admin-utilisateurs.routes')).routes,
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
