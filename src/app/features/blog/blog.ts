import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/api.service';
import { NotificationService } from '../../core/services/notification.service';
import { RevealService } from '../../core/services/reveal.service';

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  image?: string;
  slug: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog implements AfterViewInit, OnDestroy {
  private blog = inject(BlogService);
  private notify = inject(NotificationService);
  private reveal = inject(RevealService);

  articles = signal<Article[]>([
    {
      _id: '1',
      title: 'Building Scalable Web Applications with Angular 18',
      excerpt: 'Learn how to architect large-scale applications using the latest Angular features, signals, and standalone components.',
      author: 'Anvexs Team',
      date: '2024-06-03',
      category: 'Angular',
      readTime: 8,
      image: '/assets/blog1.jpg',
      slug: 'angular-scalable-apps'
    },
    {
      _id: '2',
      title: 'Node.js Best Practices for Enterprise APIs',
      excerpt: 'Complete guide to building production-ready Node.js APIs with security, validation, and error handling.',
      author: 'Anvexs Team',
      date: '2024-06-02',
      category: 'Node.js',
      readTime: 10,
      image: '/assets/blog2.jpg',
      slug: 'nodejs-api-best-practices'
    },
    {
      _id: '3',
      title: 'AI Integration: ChatGPT in Your Web App',
      excerpt: 'Step-by-step tutorial on integrating OpenAI\'s ChatGPT API into your Angular application.',
      author: 'Anvexs Team',
      date: '2024-06-01',
      category: 'AI/ML',
      readTime: 7,
      image: '/assets/blog3.jpg',
      slug: 'ai-chatgpt-integration'
    }
  ]);

  nlEmail = '';
  nlLoading = signal(false);

  ngAfterViewInit() {
    this.reveal.init();
  }

  subscribe() {
    if (!this.nlEmail || !this.nlEmail.includes('@')) {
      this.notify.error('Valid email required');
      return;
    }

    this.nlLoading.set(true);
    this.blog.subscribe(this.nlEmail).subscribe({
      next: () => {
        this.notify.success('Subscribed! Check your email');
        this.nlEmail = '';
        this.nlLoading.set(false);
      },
      error: () => {
        this.nlLoading.set(false);
      }
    });
  }

  ngOnDestroy() {
    this.reveal.destroy();
  }
}
