import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  result: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {
  projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform Redesign',
      description: 'Complete redesign of a major e-commerce platform resulting in 40% increase in conversion',
      category: 'Web Development',
      image: '🛍️',
      tags: ['Angular', 'Node.js', 'AWS'],
      result: '40% conversion increase',
    },
    {
      id: 2,
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time analytics dashboard with AI-driven insights for enterprise clients',
      category: 'AI/Analytics',
      image: '📊',
      tags: ['React', 'Python', 'TensorFlow'],
      result: '50% faster insights',
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application serving 500k+ users with seamless UX',
      category: 'Mobile Development',
      image: '📱',
      tags: ['React Native', 'Firebase'],
      result: '4.8★ App Rating',
    },
    {
      id: 4,
      title: 'Cloud Infrastructure Migration',
      description: 'Successfully migrated legacy systems to cloud with zero downtime',
      category: 'Cloud/DevOps',
      image: '☁️',
      tags: ['Kubernetes', 'AWS', 'Docker'],
      result: '60% cost savings',
    },
    {
      id: 5,
      title: 'Marketing Automation Platform',
      description: 'Built custom marketing automation platform for 1000+ campaigns/day',
      category: 'Web Development',
      image: '📧',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
      result: '3x productivity',
    },
    {
      id: 6,
      title: 'Real-time Collaboration Tool',
      description: 'Real-time collaboration platform enabling teams to work seamlessly',
      category: 'Web Development',
      image: '👥',
      tags: ['WebSockets', 'Vue.js', 'Node.js'],
      result: '1M+ users',
    },
  ];
}
