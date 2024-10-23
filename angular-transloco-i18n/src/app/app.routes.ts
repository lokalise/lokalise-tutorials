import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),  // Root route
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent),
    providers: [provideTranslocoScope('about')]  // Lazy load 'about' translations
  },
  { path: '**', redirectTo: '/' }  // Fallback route to home page
];
