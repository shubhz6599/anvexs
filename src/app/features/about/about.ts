import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../core/services/reveal.service';
 
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
 
  values = [
    { emoji: '🎯', title: 'PRECISION',  body: 'Zero ambiguity. Every spec defined, every edge case handled before a line is written.' },
    { emoji: '⚡', title: 'VELOCITY',   body: 'Startup speed with enterprise discipline. We ship fast and we ship right.' },
    { emoji: '🔒', title: 'SECURITY',   body: 'Encryption by design. AES payloads, JWT auth — hardened from the very first commit.' },
    { emoji: '🌍', title: 'SCALE',      body: 'We architect for 10× growth. Your infrastructure is never the bottleneck.' },
  ];
 
  stats = [
    { val: '230', sfx: '+', label: 'Projects Delivered' },
    { val: '98',  sfx: '%', label: 'Client Satisfaction' },
    { val: '60',  sfx: '+', label: 'Engineers & Designers' },
    { val: '5',   sfx: 'yr', label: 'Industry Experience' },
  ];
 
  timeline = [
    { year: '2020', title: 'FOUNDED IN HYDERABAD', body: 'Started as a 4-person consultancy focused on Angular and Node.js. First client: a Series-A fintech.' },
    { year: '2021', title: 'EXPANDED TO AI SERVICES', body: 'Launched our AI practice — RAG systems, LLM fine-tuning, and computer vision — serving 12 new clients.' },
    { year: '2022', title: 'TEAM HITS 30', body: 'Scaled to 30 engineers and designers. Opened our first dedicated office in HITEC City.' },
    { year: '2023', title: '100+ PROJECTS DELIVERED', body: 'Crossed the 100-project milestone. Launched our College Projects & Internship vertical. 500+ students mentored.' },
    { year: '2025', title: 'ENTERPRISE PARTNERSHIPS', body: 'Now serving global clients across 8 countries. 230+ projects. 98% client retention.' },
  ];
 
  team = [
    { initials: 'AK', name: 'ARJUN KUMAR',   role: 'FOUNDER & CTO',   bio: 'Ex-Google SWE. Architected systems serving 10M+ users.', grad: 'linear-gradient(135deg,#0af,#8b5cf6)' },
    { initials: 'PR', name: 'PRIYA RAO',     role: 'HEAD OF DESIGN',  bio: 'Previously at Flipkart Design Studio. Obsessed with motion UX.', grad: 'linear-gradient(135deg,#b8ff00,#0af)' },
    { initials: 'VS', name: 'VIKRAM SINGH',  role: 'AI LEAD',          bio: 'IIT Bombay CS. Shipped 15+ production AI systems.', grad: 'linear-gradient(135deg,#8b5cf6,#0af)' },
    { initials: 'NM', name: 'NEHA MEHTA',   role: 'HEAD OF GROWTH',  bio: 'Scaled 3 B2B SaaS companies from 0 to 100K users.', grad: 'linear-gradient(135deg,#ff3c5a,#8b5cf6)' },
  ];
 
  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy();   }
}