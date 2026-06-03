import { Injectable, NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private observer!: IntersectionObserver;

  constructor(private zone: NgZone) {}

  init(root?: Element): void {
    if (this.observer) this.observer.disconnect();

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('up');
              this.observer.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
      );

      const targets = (root ?? document).querySelectorAll(
        '.reveal, .reveal-left, .reveal-right'
      );
      targets.forEach(el => this.observer.observe(el));
    });
  }

  destroy(): void {
    this.observer?.disconnect();
  }
}