import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { LoaderComponent } from './shared/components/loader/loader';
import { ApiLoader } from './shared/components/api-loader/api-loader';
import { Toast } from './shared/components/toast/toast';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, LoaderComponent, ApiLoader, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private seo        = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  showLoader = signal(isPlatformBrowser(this.platformId));

  ngOnInit(): void {
    // Init SEO auto-updates on route changes
    this.seo.init();

    // Set organisation structured data for Google
    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Anvexs IT Hub',
      url: 'https://anvexs.com',
      logo: 'https://anvexs.com/assets/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-7841868521',
        contactType: 'customer service',
        email: 'info@anvexs.com',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahilyanagar',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      sameAs: [
        'https://www.linkedin.com/company/anvexstech/',
        'https://www.instagram.com/anvexstech',
      ],
    });

    // Skip loader on server
    if (!isPlatformBrowser(this.platformId)) {
      this.showLoader.set(false);
    }
  }

  onLoadComplete(): void {
    this.showLoader.set(false);
  }
}