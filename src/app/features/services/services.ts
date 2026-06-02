import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  color: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  services: Service[] = [
    {
      icon: '⚡',
      title: 'Web Development',
      description: 'Full-stack web applications built with modern frameworks for performance and scale.',
      features: ['Angular', 'React', 'Vue.js', 'Node.js', 'TypeScript', 'Progressive Web Apps'],
      color: '#4a9eff',
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile solutions for iOS and Android.',
      features: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'App Store Optimization', 'User Analytics'],
      color: '#7b6bff',
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by AI for automation and insights.',
      features: ['LLM Integration', 'Computer Vision', 'NLP', 'Predictive Analytics', 'Chatbots', 'Data Science'],
      color: '#00e5c3',
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and DevOps for modern applications.',
      features: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
      color: '#ff9e7b',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that delight users.',
      features: ['Design Systems', 'Wireframing', 'Prototyping', 'User Research', 'Accessibility', 'Animation'],
      color: '#4a9eff',
    },
    {
      icon: '📊',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing to drive growth and engagement.',
      features: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics', 'Conversion Optimization'],
      color: '#7b6bff',
    },
  ];

  benefits: Benefit[] = [
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Agile methodology ensures rapid iterations and quick time-to-market',
    },
    {
      icon: '🎯',
      title: 'Proven Results',
      description: 'Data-driven approach with measurable outcomes and ROI',
    },
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Enterprise-grade security and compliance standards',
    },
    {
      icon: '👥',
      title: 'Dedicated Team',
      description: 'Your own team of experts fully focused on your success',
    },
  ];
}
