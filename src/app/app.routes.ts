import { Routes } from '@angular/router';
import {Home} from './features/pages/home/home';
import {Auth} from './features/pages/auth/auth';

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', component: Home},
  {path: 'tables', component: Home},
  {path: 'shop', component: Home}, 
  {path: 'contacts', component: Home}, 
  {path: 'auth/signin', component: Auth},
  {path: 'auth/signup', component: Auth},
];
