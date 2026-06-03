import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealService } from '../../core/services/reveal.service';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  nlEmail = '';
  nlSent = signal(false);
 
  subscribeNl() {
    if (this.nlEmail) this.nlSent.set(true);
  }
 
  sideArticles = [
    { emoji: '⚡', cat: 'ANGULAR', time: '8 min', title: 'Angular 18 Signals: The End of RxJS Hell?', bg: 'linear-gradient(135deg,#0a0f05,#050a15)' },
    { emoji: '🔒', cat: 'SECURITY', time: '6 min', title: 'AES-256 API Encryption: A Production Pattern', bg: 'linear-gradient(135deg,#100510,#0a0515)' },
  ];
 
  articles = [
    { emoji: '🎮', cat: 'GAME DEV',     time: '10 min', title: 'Three.js vs Unity for Web Games', excerpt: 'Performance benchmarks, bundle size wars, and the WebGL rendering pipeline explained.', bg: 'linear-gradient(135deg,#0a1505,#050f1a)' },
    { emoji: '📊', cat: 'ARCHITECTURE', time: '14 min', title: 'Microservices vs Monolith in 2025', excerpt: 'After 230 projects, here\'s when we choose each — the answer might surprise you.', bg: 'linear-gradient(135deg,#150a00,#05100a)' },
    { emoji: '🚀', cat: 'GROWTH',       time: '7 min',  title: 'How We Hit ₹22Cr ARR in 9 Months', excerpt: 'Full playbook: paid media, conversion architecture, and retention engineering.', bg: 'linear-gradient(135deg,#0a0515,#15050a)' },
    { emoji: '🤖', cat: 'AI/ML',        time: '11 min', title: 'Fine-tuning vs RAG: When to Use Which', excerpt: 'Practical decision framework from 30+ production AI deployments.', bg: 'linear-gradient(135deg,#050a15,#0a0520)' },
    { emoji: '📱', cat: 'MOBILE',       time: '9 min',  title: 'React Native vs Flutter in 2025', excerpt: 'Updated benchmarks after building 40+ cross-platform apps across both frameworks.', bg: 'linear-gradient(135deg,#150510,#051015)' },
    { emoji: '🔐', cat: 'SECURITY',     time: '8 min',  title: 'JWT + Refresh Token Strategy That Scales', excerpt: 'The auth architecture we use across all our production applications.', bg: 'linear-gradient(135deg,#101500,#001510)' },
  ];
 
  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}
 