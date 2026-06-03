import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../core/services/reveal.service';
 
@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  billing = signal<'monthly' | 'annual'>('monthly');
  openFaq = signal<number | null>(null);
 
  setBilling(v: 'monthly' | 'annual') { this.billing.set(v); }
  toggleFaq(i: number) { this.openFaq.set(this.openFaq() === i ? null : i); }
 
  plans = [
    {
      tier: 'STARTER', featured: false, currency: '₹', price: '49,999', priceAnnual: '39,999',
      period: '/project', btnLabel: 'Get Started', btnClass: 'btn-ghost',
      desc: 'Perfect for early-stage startups and college final-year projects needing production-quality execution.',
      features: [
        { text: '1 core feature module', included: true },
        { text: 'Responsive web app', included: true },
        { text: 'MongoDB + Node.js backend', included: true },
        { text: 'JWT authentication', included: true },
        { text: '30-day post-launch support', included: true },
        { text: 'AI integration', included: false },
        { text: 'Custom design system', included: false },
      ],
    },
    {
      tier: 'GROWTH', featured: true, currency: '₹', price: '1,49,999', priceAnnual: '1,19,999',
      period: '/project', btnLabel: 'Start Project', btnClass: 'btn-primary',
      desc: 'For scale-ups and businesses shipping production platforms with real users and real revenue.',
      features: [
        { text: 'Full-stack web platform', included: true },
        { text: 'Custom UI/UX design system', included: true },
        { text: 'Advanced auth + AES encryption', included: true },
        { text: 'Admin dashboard', included: true },
        { text: '3rd-party integrations (×3)', included: true },
        { text: '90-day post-launch support', included: true },
        { text: 'SEO foundation & analytics', included: true },
      ],
    },
    {
      tier: 'ENTERPRISE', featured: false, currency: '', price: 'Custom', priceAnnual: 'Custom',
      period: '', btnLabel: "Let's Talk", btnClass: 'btn-outline-primary',
      desc: 'Multi-system platforms, AI integration, dedicated team embedding, and long-term engineering partnerships.',
      features: [
        { text: 'Everything in Growth', included: true },
        { text: 'AI/ML integration', included: true },
        { text: 'Dedicated project manager', included: true },
        { text: 'Mobile app included', included: true },
        { text: 'Multi-cloud deployment', included: true },
        { text: '24/7 production SLA', included: true },
        { text: 'White-label options', included: true },
      ],
    },
  ];
 
  faqs = [
    { q: 'How long does a typical project take?', a: 'Starter: 4–6 weeks. Growth: 8–14 weeks. Enterprise scoped individually. We commit to a delivery schedule upfront and hold ourselves to it.' },
    { q: 'Do you offer NDAs and IP ownership?', a: 'Yes — 100% IP transfer on completion. We sign NDAs before discovery calls. Your code, your data, your product.' },
    { q: 'Can I hire Anvexs as an extended team?', a: 'Absolutely. Many clients embed 2–8 Anvexs engineers into their in-house team on monthly retainers. We integrate into your Jira, Slack, and standups.' },
    { q: 'What tech stacks do you specialise in?', a: 'Angular 18, React 19, Node.js, Python, Flutter, React Native, Unity, MongoDB, PostgreSQL, AWS, GCP. We pick the right tool — not the familiar one.' },
    { q: 'How do payments work?', a: 'Milestone-based: 30% kickoff, 40% mid-sprint, 30% delivery. Enterprise uses monthly billing. We accept NEFT, UPI, wire, and crypto.' },
    { q: 'Do you work with international clients?', a: 'Yes — active clients in US, UK, UAE, Singapore, and Australia. We work across timezones with overlap hours agreed upfront.' },
  ];
 
  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}
 