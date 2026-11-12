import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth-guard';
import {RouteSeo} from './core/seo/route-seo';

const seo = (data: RouteSeo): {seo: RouteSeo} => ({seo: data});

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    data: seo({
      title: 'Asteria — jeu de rôle sur plateau',
    }),
  },
  {
    path: 'tables',
    loadComponent: () => import('./pages/tables/tables').then(m => m.Tables),
    canActivate: [authGuard],
    data: seo({
      title: 'Mes tables | Asteria',
      description: 'Gérez vos tables de jeu de rôle sur plateau : créez une nouvelle table ou rejoignez-en une avec un code.',
      noindex: true,
    }),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts').then(m => m.Contacts),
    data: seo({
      title: 'Contact | Asteria',
    }),
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth),
    data: seo({
      title: 'Connexion | Asteria',
      description: "Connectez-vous ou inscrivez-vous pour rejoindre Asteria, jeu de rôle sur plateau accessible aux débutants.",
      noindex: true,
    }),
  },
  {
    path: 'rules',
    loadComponent: () => import('./pages/rules/rules').then(m => m.Rules),
    data: seo({
      title: 'Règles | Asteria',
      description: "Les règles d'Asteria : découvrez les classes et les races jouables de ce jeu de rôle sur plateau.",
    }),
  },
  {
    path: 'rules/classes',
    loadComponent: () => import('./pages/rules/classes/classes').then(m => m.Classes),
    data: seo({
      title: 'Les classes | Asteria',
      description: 'Découvrez les classes jouables du jeu de rôle sur plateau Asteria.',
    }),
  },
  {
    path: 'rules/races',
    loadComponent: () => import('./pages/rules/races/races').then(m => m.Races),
    data: seo({
      title: 'Les races | Asteria',
      description: 'Découvrez les races jouables du jeu de rôle sur plateau Asteria.',
    }),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
    data: {
      tab: 'profile',
      ...seo({
        title: 'Mon profil | Asteria',
        description: 'Consultez et modifiez les informations de votre compte Asteria.',
        noindex: true,
      }),
    },
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/profile/profile').then(m => m.Profile),
    canActivate: [authGuard],
    data: {
      tab: 'settings',
      ...seo({
        title: 'Paramètres | Asteria',
        description: 'Gérez les paramètres de votre compte Asteria : mot de passe et notifications.',
        noindex: true,
      }),
    },
  },
];
