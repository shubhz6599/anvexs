import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
}

interface Perk {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {
  jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      description: 'Lead development of scalable web applications using modern frameworks.',
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Build intelligent solutions using machine learning and deep learning.',
    },
    {
      id: 3,
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Design beautiful and intuitive user experiences for our clients.',
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Build and maintain cloud infrastructure and deployment pipelines.',
    },
    {
      id: 5,
      title: 'QA Automation Engineer',
      department: 'Quality',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Develop automated testing frameworks and ensure product quality.',
    },
    {
      id: 6,
      title: 'Business Development Lead',
      department: 'Sales',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      description: 'Build partnerships and drive revenue growth for Anvexs.',
    },
  ];

  perks: Perk[] = [
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Market-leading compensation with performance bonuses',
    },
    {
      icon: '🏥',
      title: 'Health Benefits',
      description: 'Comprehensive health, dental, and vision coverage',
    },
    {
      icon: '📚',
      title: 'Learning Budget',
      description: '$2000 annual budget for courses, certifications, and conferences',
    },
    {
      icon: '🏠',
      title: 'Remote-First',
      description: 'Work from anywhere with flexible working hours',
    },
    {
      icon: '🌴',
      title: 'Unlimited PTO',
      description: 'Work-life balance is crucial, take time off when you need it',
    },
    {
      icon: '🎮',
      title: 'Team Culture',
      description: 'Collaborative team events and social activities',
    },
  ];
}
