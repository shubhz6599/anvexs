import {
  Component, OnInit, OnDestroy, ElementRef, AfterViewInit, signal, viewChild
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface ServiceCard {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements AfterViewInit {
  showScrollIndicator = signal(true);
  stats: Stat[] = [
    { value: '200', suffix: '+', label: 'Projects Delivered' },
    { value: '98', suffix: '%', label: 'Client Satisfaction' },
    { value: '50', suffix: '+', label: 'Tech Professionals' },
    { value: '5', suffix: 'yr', label: 'Industry Experience' },
  ];
 
  trustLogos = ['TechCorp', 'InnovateLab', 'BuilderX', 'Startify', 'NovaSoft'];
 
  services: ServiceCard[] = [
    {
      icon: '⚡',
      title: 'Web & App Development',
      desc: 'Enterprise web platforms and mobile applications engineered with modern stacks — Angular, React, Node.js, and cloud-native architecture.',
      tags: ['Angular', 'React', 'Node.js', 'React Native'],
      link: '/services',
      color: '#4a9eff',
    },
    {
      icon: '🤖',
      title: 'AI Tools Integration',
      desc: 'Embed intelligence into your products — LLM-powered assistants, predictive analytics pipelines, and computer vision solutions.',
      tags: ['LangChain', 'OpenAI', 'TensorFlow', 'Python'],
      link: '/services',
      color: '#00e5c3',
    },
    {
      icon: '🎮',
      title: 'Game Development',
      desc: 'Immersive 2D/3D games and gamified enterprise applications built with Unity, Unreal, and modern web-based game engines.',
      tags: ['Unity', 'Unreal', 'Three.js', 'WebGL'],
      link: '/services',
      color: '#7b6bff',
    },
    {
      icon: '📈',
      title: 'Digital Marketing',
      desc: 'Data-driven growth strategies — SEO, performance advertising, and brand authority campaigns that convert at scale.',
      tags: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
      link: '/services',
      color: '#ff6b6b',
    },
  ];
 
  pillars = [
    { title: 'Production-first mindset', desc: 'Every deliverable is production-ready from day one. No prototypes shipped as products.' },
    { title: 'Security by design', desc: 'Encryption, auth flows, and threat modelling baked into the architecture — not bolted on.' },
    { title: 'Transparent delivery', desc: "Agile sprints with real-time dashboards. You always know exactly what's being built and when." },
    { title: 'Long-term partnership', desc: "We're not a one-project vendor. We become your extended engineering arm." },
  ];
 
  ngAfterViewInit(): void {
    this.initScrollReveal();
    this.initScrollListener();
  }

  private initScrollListener(): void {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.showScrollIndicator.set(false);
      } else {
        this.showScrollIndicator.set(true);
      }
    });
  }
 
  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('up')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
