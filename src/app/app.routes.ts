import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth-guard';
import {Home} from './pages/home/home';
import {Auth} from './pages/auth/auth';
import {Tables} from './pages/tables/tables';
import {Contacts} from './pages/contacts/contacts';
import {Rules} from './pages/rules/rules';
import {Classes} from './pages/rules/classes/classes';
import {Races} from './pages/rules/races/races';

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', component: Home},
  {path: 'tables', component: Tables, canActivate: [authGuard]},
  {path: 'shop', component: Home},
  {path: 'contacts', component: Contacts},
  {path: 'auth', component: Auth},
  {path: 'rules', component: Rules},
  {path: 'rules/classes', component: Classes},
  {path: 'rules/races', component: Races},
];
