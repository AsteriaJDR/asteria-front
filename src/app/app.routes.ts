import { Routes } from '@angular/router';
import {Home} from './features/pages/home/home';

export const routes: Routes = [
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '', component: Home},
  {path: 'tables', component: Home}, // Temporaire - à remplacer par le vrai composant
  {path: 'shop', component: Home}, // Temporaire - à remplacer par le vrai composant
  {path: 'contacts', component: Home}, // Temporaire - à remplacer par le vrai composant
];
