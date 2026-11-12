import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth-guard';

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home)},
  {
    path: 'tables',
    loadComponent: () => import('./pages/tables/tables').then(m => m.Tables),
    canActivate: [authGuard],
  },
  {path: 'contacts', loadComponent: () => import('./pages/contacts/contacts').then(m => m.Contacts)},
  {path: 'auth', loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)},
  {path: 'rules', loadComponent: () => import('./pages/rules/rules').then(m => m.Rules)},
  {
    path: 'rules/classes',
    loadComponent: () => import('./pages/rules/classes/classes').then(m => m.Classes),
  },
  {
    path: 'rules/races',
    loadComponent: () => import('./pages/rules/races/races').then(m => m.Races),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
    data: {tab: 'profile'},
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
    data: {tab: 'settings'},
  },
];
