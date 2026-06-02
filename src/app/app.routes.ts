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
    title: 'About Anvexs - Tech-First Innovation',
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services').then(m => m.Services),
    title: 'Services - Web, AI, Mobile & Digital Marketing',
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./features/portfolio/portfolio').then(m => m.Portfolio),
    title: 'Portfolio - Our Projects',
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog').then(m => m.Blog),
    title: 'Blog - Tech Insights & Articles',
  },
  {
    path: 'pricing',
    loadComponent: () => import('./features/pricing/pricing').then(m => m.Pricing),
    title: 'Pricing - Flexible Plans',
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./features/testimonials/testimonials').then(m => m.Testimonials),
    title: 'Testimonials - Client Success Stories',
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers').then(m => m.Careers),
    title: 'Careers - Join Anvexs IT Hub',
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact),
    title: 'Contact Anvexs - Get In Touch',
  },
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth').then(m => m.Auth),
    title: 'Login / Register - Anvexs',
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFound),
    title: '404 - Page Not Found',
  },
];