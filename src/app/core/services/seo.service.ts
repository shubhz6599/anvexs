import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const BASE_TITLE = 'Anvexs IT Hub';
const BASE_URL   = 'https://anvexs.com';
const DEFAULT_IMG = `${BASE_URL}/assets/og-default.jpg`;

const PAGE_SEO: Record<string, SeoData> = {
  '/': {
    title: 'Anvexs IT Hub — Enterprise Technology Solutions',
    description: 'We build high-performance web apps, mobile apps, AI tools & games. 5+ projects, 10+ tech professionals. Starting ₹23,000.',
    keywords: 'web development, app development, AI integration, game development, software company India, startup tech',
    ogImage: `${BASE_URL}/assets/og-home.jpg`,
  },
  '/about': {
    title: 'About Us — Anvexs IT Hub',
    description: 'Fresh startup, expert team. 10+ passionate tech professionals building enterprise-grade software since 2024.',
    keywords: 'about anvexs, software team, tech startup India, Ahilyanagar',
  },
  '/services': {
    title: 'Services — Web, Mobile, AI & Game Development | Anvexs',
    description: 'Full-stack development with Angular, React, Node.js, Spring Boot, Python, Django, .NET and more. Affordable enterprise solutions.',
    keywords: 'web development services, angular development, nodejs, spring boot, python django, AI ML services India',
  },
  '/portfolio': {
    title: 'Portfolio — Anvexs IT Hub Projects',
    description: 'View our delivered projects — web platforms, mobile apps, AI integrations and more.',
    keywords: 'portfolio, projects, case studies, software development examples',
  },
  '/pricing': {
    title: 'Pricing — Affordable Software Development | Anvexs',
    description: 'Transparent pricing starting ₹23,000. Starter, Growth, and Enterprise plans for every business stage.',
    keywords: 'software development pricing India, affordable web development, startup pricing',
  },
  '/blog': {
    title: 'Blog — Tech Insights & Tutorials | Anvexs',
    description: 'Expert articles on Angular, Node.js, AI, Spring Boot and modern software development best practices.',
    keywords: 'tech blog, angular tutorials, nodejs, AI blog, software development',
  },
  '/testimonials': {
    title: 'Client Reviews — Anvexs IT Hub',
    description: 'See what our clients say about working with Anvexs IT Hub on their software projects.',
    keywords: 'client reviews, testimonials, software company reviews',
  },
  '/careers': {
    title: 'Careers — Join Our Team | Anvexs IT Hub',
    description: 'Join a passionate team building enterprise software. Open roles in engineering, design, AI and growth.',
    keywords: 'tech jobs India, software engineer jobs, angular developer, nodejs jobs',
  },
  '/contact': {
    title: 'Contact — Start Your Project | Anvexs IT Hub',
    description: 'Get in touch for web, mobile, AI or game development. Fast response, free consultation. Call +91 9359932573.',
    keywords: 'contact software company, hire developers India, web development quote',
  },
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta   = inject(Meta);
  private title  = inject(Title);
  private router = inject(Router);

  init(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      const url  = (e as NavigationEnd).urlAfterRedirects.split('?')[0];
      const data = PAGE_SEO[url] || {};
      this.update(data, url);
    });
  }

  update(data: SeoData, path = ''): void {
    const t   = data.title       || BASE_TITLE;
    const d   = data.description || 'Anvexs IT Hub — Enterprise technology solutions.';
    const k   = data.keywords    || 'software development, Anvexs';
    const img = data.ogImage     || DEFAULT_IMG;
    const url = data.canonical   || `${BASE_URL}${path}`;
    const type = data.ogType     || 'website';

    this.title.setTitle(t);

    this.meta.updateTag({ name: 'description',        content: d });
    this.meta.updateTag({ name: 'keywords',           content: k });
    this.meta.updateTag({ name: 'robots',             content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title',       content: t });
    this.meta.updateTag({ property: 'og:description', content: d });
    this.meta.updateTag({ property: 'og:image',       content: img });
    this.meta.updateTag({ property: 'og:url',         content: url });
    this.meta.updateTag({ property: 'og:type',        content: type });
    this.meta.updateTag({ property: 'og:site_name',   content: BASE_TITLE });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card',        content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title',       content: t });
    this.meta.updateTag({ name: 'twitter:description', content: d });
    this.meta.updateTag({ name: 'twitter:image',       content: img });

    // Canonical
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    if (typeof document === 'undefined') return;
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  // Structured data for Google rich results
  setJsonLd(data: object): void {
    if (typeof document === 'undefined') return;
    let el = document.querySelector('#json-ld') as HTMLScriptElement;
    if (!el) {
      el = document.createElement('script');
      el.id = 'json-ld';
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }
}