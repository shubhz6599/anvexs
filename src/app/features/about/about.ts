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
  { emoji: '🚀', title: 'SPEED', body: 'Startup agility with enterprise quality.' },
  { emoji: '🎯', title: 'PRECISION', body: 'Every detail matters. Every spec defined.' },
  { emoji: '💪', title: 'PASSION', body: 'Built by developers who love what they do.' },
  { emoji: '🌍', title: 'SCALE', body: 'Architected for growth from day one.' },
];

stats = [
  { val: '5', sfx: '+', label: 'Projects Delivered' },
  { val: '10', sfx: '+', label: 'Tech Experts' },
  { val: '100', sfx: '%', label: 'Quality Focus' },
  { val: '2026', sfx: '', label: 'Founded' },
];

  timeline = [
    { year: 'Jan-2026', title: 'FOUNDED IN Ahilyanagr, MH', body: 'Born with vision to deliver enterprise-grade solutions at startup prices. 10 passionate tech professionals united.' },
    { year: 'Mar-2026', title: '2 PROJECTS DELIVERED', body: 'Already trusted by early-stage startups and SMEs with cutting-edge tech stacks.' },
    { year: 'Apr-2026', title: 'TEAM HITS 10', body: 'Scaled to 10 engineers and designers.' },
    { year: 'Now', title: 'SCALING WITH PURPOSE', body: 'Building an ecosystem where innovation meets affordability. Every client is a success story we\'re proud of.' },
  ];

  team = [
    { initials: 'AK', name: 'Anushka Khose',   role: 'FOUNDER & CTO',   bio: 'Visionary leader driving innovation and strategy', grad: 'linear-gradient(135deg,#0af,#8b5cf6)' },
    { initials: 'SK', name: '*************',     role: 'HEAD OF DESIGN',  bio: 'Previously at M & M . Obsessed with motion UX.', grad: 'linear-gradient(135deg,#b8ff00,#0af)' },
    { initials: 'VS', name: '*************',  role: 'AI LEAD',          bio: 'IIT Bombay CS. Shipped 5+ production AI systems.', grad: 'linear-gradient(135deg,#8b5cf6,#0af)' },
    { initials: 'NM', name: '*************',   role: 'HEAD OF GROWTH',  bio: 'Scaled 1 B2B SaaS company from 0 to 100K users.', grad: 'linear-gradient(135deg,#ff3c5a,#8b5cf6)' },
  ];

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy();   }
}
