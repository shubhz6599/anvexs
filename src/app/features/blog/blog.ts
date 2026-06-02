import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  posts: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Web Development: 2025 Trends',
      excerpt: 'Explore the latest trends shaping web development, from AI integration to edge computing.',
      author: 'Rajesh Kumar',
      date: 'Jan 15, 2024',
      category: 'Web Dev',
      image: '📚',
    },
    {
      id: 2,
      title: 'Building Scalable Cloud Applications',
      excerpt: 'Learn best practices for architecting cloud-native applications that scale seamlessly.',
      author: 'Priya Singh',
      date: 'Jan 12, 2024',
      category: 'Cloud',
      image: '☁️',
    },
    {
      id: 3,
      title: 'AI-Powered Solutions: Practical Implementation',
      excerpt: 'A deep dive into implementing AI solutions in real-world applications with practical examples.',
      author: 'Neha Sharma',
      date: 'Jan 8, 2024',
      category: 'AI/ML',
      image: '🤖',
    },
    {
      id: 4,
      title: 'Mobile-First Design Principles',
      excerpt: 'Creating exceptional mobile experiences with responsive design and mobile-first approach.',
      author: 'Amit Patel',
      date: 'Jan 5, 2024',
      category: 'Design',
      image: '📱',
    },
    {
      id: 5,
      title: 'DevOps Best Practices for 2024',
      excerpt: 'Streamline your development pipeline with modern DevOps practices and tools.',
      author: 'Rajesh Kumar',
      date: 'Dec 29, 2023',
      category: 'DevOps',
      image: '⚙️',
    },
    {
      id: 6,
      title: 'Cybersecurity in Modern Applications',
      excerpt: 'Essential security measures to protect your applications from evolving threats.',
      author: 'Priya Singh',
      date: 'Dec 22, 2023',
      category: 'Security',
      image: '🔒',
    },
  ];
}
