import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Value {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  teamMembers: TeamMember[] = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'R',
      bio: 'Tech visionary with 15+ years in enterprise software',
    },
    {
      name: 'Priya Singh',
      role: 'CTO',
      image: 'P',
      bio: 'Cloud architect specializing in scalable systems',
    },
    {
      name: 'Amit Patel',
      role: 'Head of Design',
      image: 'A',
      bio: 'UX/UI expert crafting exceptional experiences',
    },
    {
      name: 'Neha Sharma',
      role: 'Head of AI',
      image: 'N',
      bio: 'ML engineer building intelligent solutions',
    },
  ];

  values: Value[] = [
    {
      title: 'Innovation First',
      description: 'We stay ahead of tech trends and deliver cutting-edge solutions',
      icon: '💡',
    },
    {
      title: 'Quality Obsessed',
      description: 'Every line of code is tested, reviewed, and optimized',
      icon: '✨',
    },
    {
      title: 'Client Success',
      description: 'Your growth is our success metric',
      icon: '🎯',
    },
    {
      title: 'Collaboration',
      description: 'We work as an extension of your team',
      icon: '🤝',
    },
  ];
}
