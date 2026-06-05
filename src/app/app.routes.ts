// ============================================
// ANVEXS - Application Routes
// ============================================
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
    title: 'Anvexs IT Hub - Enterprise Technology Solutions',
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About),
    title: 'About - Anvexs IT Hub',
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services').then(m => m.Services),
    title: 'Services - Web, AI, Mobile, Game Development & Digital Marketing | Anvexs',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio').then(m => m.Portfolio),
    title: 'Portfolio - Anvexs IT Hub',
  },
   {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing').then(m => m.Pricing),
    title: 'Pricing — Affordable Software Development | Anvexs',
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog').then(m => m.Blog),
    title: 'Blog — Tech Insights & Tutorials | Anvexs',
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./features/testimonials/testimonials').then(m => m.Testimonials),
    title: 'Client Reviews — Anvexs IT Hub',
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers').then(m => m.Careers),
    title: 'Careers — Join Our Team | Anvexs IT Hub',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact — Start Your Project | Anvexs IT Hub',
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
    title: 'Login / Register — Anvexs',
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFound),
    title: '404 - Page Not Found | Anvexs IT Hub',
  },
];