import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials {
  testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc',
      content: 'Anvexs transformed our entire development pipeline. The quality of work and professionalism is unmatched. Highly recommended!',
      rating: 5,
      image: 'S',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      company: 'CloudSoft Solutions',
      content: 'Working with Anvexs was a game-changer. They delivered our project on time and exceeded expectations in every way.',
      rating: 5,
      image: 'M',
    },
    {
      name: 'Emma Davis',
      role: 'Product Manager',
      company: 'InnovateLabs',
      content: 'The team is incredibly responsive, skilled, and understands our business goals. They have become an extension of our team.',
      rating: 5,
      image: 'E',
    },
    {
      name: 'David Wilson',
      role: 'Founder',
      company: 'StartupHub',
      content: 'Outstanding service from start to finish. The level of attention to detail and commitment to excellence is remarkable.',
      rating: 5,
      image: 'D',
    },
    {
      name: 'Lisa Anderson',
      role: 'VP Engineering',
      company: 'TechVentures',
      content: 'Anvexs delivered a world-class solution. Their expertise in modern tech stacks and scalability is exceptional.',
      rating: 5,
      image: 'L',
    },
    {
      name: 'James Martinez',
      role: 'Business Development',
      company: 'Global Tech Corp',
      content: 'The professionalism, communication, and technical expertise demonstrated by Anvexs is outstanding. Kudos to the team!',
      rating: 5,
      image: 'J',
    },
  ];
}
