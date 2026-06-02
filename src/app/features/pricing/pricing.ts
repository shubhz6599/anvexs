import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
})
export class Pricing {
  plans: PricingPlan[] = [
    {
      name: 'Starter',
      price: '5K',
      period: 'per month',
      description: 'Perfect for small projects and MVPs',
      features: [
        'Up to 2 developers',
        '20 hours/week',
        'Basic support',
        'Git repository',
        'Monthly reporting',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: '15K',
      period: 'per month',
      description: 'Ideal for growing businesses',
      features: [
        'Up to 5 developers',
        '40 hours/week',
        'Priority support',
        'Agile methodology',
        'Bi-weekly demos',
        'Advanced analytics',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large-scale projects',
      features: [
        'Unlimited developers',
        '60+ hours/week',
        '24/7 dedicated support',
        'Custom solutions',
        'Weekly sprints',
        'Security audits',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
    },
  ];
}
