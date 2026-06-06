import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { BlogService } from '../../core/services/api.service';
import { NotificationService } from '../../core/services/notification.service';

interface Article {
  id: string;
  emoji: string;
  cat: string;
  time: string;
  title: string;
  excerpt: string;
  bg: string;
  date: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  private blog   = inject(BlogService);
  private notify = inject(NotificationService);

  nlEmail = '';
  nlSent  = signal(false);
  nlBusy  = signal(false);
  nlError = signal('');

  subscribe() {
    if (!this.nlEmail || !this.nlEmail.includes('@')) {
      this.nlError.set('Please enter a valid email address');
      return;
    }
    this.nlError.set('');
    this.nlBusy.set(true);

    this.blog.subscribe(this.nlEmail).subscribe({
      next: () => {
        this.nlSent.set(true);
        this.notify.success('Subscribed! First issue arrives Tuesday.');
        this.nlBusy.set(false);
      },
      error: err => {
        // Already subscribed is fine
        if (err.status === 200 || err.error?.message?.includes('already')) {
          this.nlSent.set(true);
        } else {
          this.nlError.set(err.error?.message || 'Subscription failed. Try again.');
        }
        this.nlBusy.set(false);
      }
    });
  }

  sideArticles: Article[] = [
    { id: 's1', emoji: '⚡', cat: 'ANGULAR', time: '8 min', title: 'Angular 21 Signals: The End of RxJS Complexity?', excerpt: '', bg: 'linear-gradient(135deg,#04090e,#040e18)', date: 'Jun 2025' },
    { id: 's2', emoji: '🔒', cat: 'SECURITY', time: '6 min', title: 'AES-256 API Encryption: A Production Pattern', excerpt: '', bg: 'linear-gradient(135deg,#0c040e,#06040e)', date: 'May 2025' },
  ];

  articles: Article[] = [
    { id: '1', emoji: '🎮', cat: 'GAME DEV',     time: '10 min', title: 'Three.js vs Unity WebGL for Web Games in 2025', excerpt: 'Performance benchmarks, bundle sizes, and the WebGL rendering pipeline compared side-by-side.', bg: 'linear-gradient(135deg,#061004,#030c14)', date: 'Jun 2025' },
    { id: '2', emoji: '📊', cat: 'ARCHITECTURE', time: '14 min', title: 'Microservices vs Monolith: A 2025 Decision Framework', excerpt: 'After building 5+ production systems, here\'s when we choose each architecture — and why.', bg: 'linear-gradient(135deg,#100800,#060e08)', date: 'May 2025' },
    { id: '3', emoji: '🤖', cat: 'AI/ML',        time: '11 min', title: 'Fine-Tuning vs RAG: A Practical Decision Framework', excerpt: 'From 15+ production AI deployments — when to fine-tune and when to use retrieval augmentation.', bg: 'linear-gradient(135deg,#040a14,#060418)', date: 'May 2025' },
    { id: '4', emoji: '📱', cat: 'MOBILE',       time: '9 min',  title: 'React Native vs Flutter in 2025: Updated Benchmarks', excerpt: 'Real numbers from building cross-platform apps in both frameworks over the last year.', bg: 'linear-gradient(135deg,#10040c,#060c14)', date: 'Apr 2025' },
    { id: '5', emoji: '🔐', cat: 'SECURITY',     time: '8 min',  title: 'JWT + Refresh Token Strategy That Scales', excerpt: 'The exact auth architecture we use across all our production Angular/Node.js applications.', bg: 'linear-gradient(135deg,#0c1000,#001008)', date: 'Apr 2025' },
    { id: '6', emoji: '🚀', cat: 'DEVOPS',       time: '7 min',  title: 'Angular SSR on Vercel: Complete Deployment Guide', excerpt: 'Step-by-step setup for Angular 21 SSR with edge rendering, caching, and performance tuning.', bg: 'linear-gradient(135deg,#0a0410,#040810)', date: 'Mar 2025' },
  ];

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}