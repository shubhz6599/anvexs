import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer: IntersectionObserver | null = null;
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  init(root?: Element) {
     if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('up');
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals.forEach(el => this.observer?.observe(el));
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
