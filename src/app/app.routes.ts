// ============================================
// src/app/app.routes.ts
// ============================================
import { Routes } from '@angular/router';

// Import minimal des pages racines (le reste lazy-loaded)
import { Home } from './home/home';
// import { DashboardAdmin } from './pages/admin/dashboard-admin';
// import { Entreprises } from './pages/gestionnaire/entreprises';
import { Login } from '../app/features/auth/login/login';
import { Register } from './features/auth/register/register';
import { RegisterEmail } from './features/auth/register-email/register-email';
import { AuthService } from './features/auth/auth.service';
import { RoleGuard } from './features/guard/role.guard';
// import { ListeCollaborateurs } from './pages/collaborateurs/liste-collaborateurs';
// import { ListeClients } from './pages/client/liste-clients';
// import { DashboardCompta } from './pages/comptabilite/dashboard-compta';

export const routes: Routes = [
  { path: '', component: Home, title: 'Accueil' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  // { path: 'registerEmail', component: RegisterEmail },
  // Section Admin
  {
    path: 'admin',
    loadChildren: async () => (await import('./features/sidebar/admin.routes/admin.routes')).routes,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },
  //   path: 'admin',
  //   children: [
  //     {
  //       path: 'utilisateurs/liste',
  //       loadComponent: () =>
  //         import('./pages/admin/utilisateurs/liste-utilisateurs/liste-utilisateurs').then(
  //           (m) => m.ListeUtilisateurs
  //         ),
  //     },
  //     {
  //       path: 'utilisateurs/ajouter',
  //       loadComponent: () =>
  //         import('./pages/admin/utilisateurs/ajouter-utilisateur/ajouter-utilisateur').then(
  //           (m) => m.AjouterUtilisateur
  //         ),
  //     },
  //     {
  //       path: 'utilisateurs/modifier/',
  //       loadComponent: () =>
  //         import('./pages/admin/utilisateurs/modifier-utilisateur/modifier-utilisateur').then(
  //           (m) => m.ModifierUtilisateur
  //         ),
  //     },
  //     {
  //       path: 'entreprises/liste',
  //       loadComponent: () =>
  //         import('./pages/admin/entreprises/liste-entreprises/liste-entreprises').then(
  //           (m) => m.ListeEntreprises
  //         ),
  //     },
  //     {
  //       path: 'entreprises/ajouter',
  //       loadComponent: () =>
  //         import('./pages/admin/entreprises/ajouter-entreprise/ajouter-entreprise').then(
  //           (m) => m.AjouterEntreprise
  //         ),
  //     },
  //     {
  //       path: 'chevaux/liste',
  //       loadComponent: () =>
  //         import('./pages/admin/chevaux/liste-chevaux/liste-chevaux').then((m) => m.ListeChevaux),
  //     },
  //     {
  //       path: 'chevaux/ajouter',
  //       loadComponent: () =>
  //         import('./pages/admin/chevaux/ajouter-cheval/ajouter-cheval').then(
  //           (m) => m.AjouterCheval
  //         ),
  //     },
  //   ],
  // },

  // // Section Gestionnaire
  // {
  //   path: 'gestionnaire',
  //   children: [
  //     { path: '', redirectTo: 'entreprises', pathMatch: 'full' },
  //     { path: 'entreprises', component: Entreprises },
  //     { path: 'productions', loadComponent: () => import('./pages/gestionnaire/productions').then(m => m.Productions) },
  //     { path: 'rapports', loadComponent: () => import('./pages/gestionnaire/rapports').then(m => m.Rapports) }
  //   ]
  // },

  // // Section Collaborateurs
  // {
  //   path: 'collaborateurs',
  //   children: [
  //     { path: '', component: ListeCollaborateurs },
  //     { path: 'ajouter', loadComponent: () => import('./pages/collaborateurs/ajouter-collaborateur').then(m => m.AjouterCollaborateur) },
  //     { path: 'equipes', loadComponent: () => import('./pages/collaborateurs/equipes').then(m => m.Equipes) }
  //   ]
  // },

  // // Section Client
  // {
  //   path: 'client',
  //   children: [
  //     { path: '', component: ListeClients },
  //     { path: 'contrats', loadComponent: () => import('./pages/client/contrats').then(m => m.Contrats) },
  //     { path: 'factures', loadComponent: () => import('./pages/client/factures').then(m => m.Factures) }
  //   ]
  // },

  // // Section Comptabilité
  // {
  //   path: 'comptabilite',
  //   children: [
  //     { path: '', component: DashboardCompta },
  //     { path: 'factures', loadComponent: () => import('./pages/comptabilite/factures').then(m => m.FacturesCompta) },
  //     { path: 'depenses', loadComponent: () => import('./pages/comptabilite/depenses').then(m => m.Depenses) }
  //   ]
  // },

  // Route fallback
  { path: '**', redirectTo: '' },
];
