import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'rules', renderMode: RenderMode.Prerender },
  { path: 'contacts', renderMode: RenderMode.Prerender },
  { path: 'auth', renderMode: RenderMode.Prerender },
  { path: 'rules/classes', renderMode: RenderMode.Client },
  { path: 'rules/races', renderMode: RenderMode.Client },
  { path: 'tables', renderMode: RenderMode.Client },
  { path: 'profile', renderMode: RenderMode.Client },
  { path: 'settings', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Client },
];
