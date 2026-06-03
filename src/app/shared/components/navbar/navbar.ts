import {
  Component, signal,
  HostListener, inject, ChangeDetectionStrategy
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
   auth = inject(AuthService);
  scrolled = signal(false);
  menuOpen = signal(false);

  navItems = [
    { label: 'Home',      path: '/' },
    { label: 'About',     path: '/about' },
    { label: 'Services',  path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing',   path: '/pricing' },
    { label: 'Blog',      path: '/blog' },
    { label: 'Clients',   path: '/testimonials' },
    { label: 'Careers',   path: '/careers' },
    { label: 'Contact',   path: '/contact' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 24); }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
