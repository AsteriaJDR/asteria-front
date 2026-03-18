import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {Auth} from './pages/auth/auth';
import {Tables} from './pages/tables/tables';
import {Contacts} from './pages/contacts/contacts';
import {Rules} from './pages/rules/rules';

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', component: Home},
  {path: 'tables', component: Tables},
  {path: 'shop', component: Home},
  {path: 'contacts', component: Contacts},
  {path: 'auth', component: Auth},
];
