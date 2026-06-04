import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../core/services/reveal.service';
 
interface Project {
  cat: string;
  emoji: string;
  title: string;
  sub: string;
  bg: string;
  span: string;
  tall?: boolean;
}
 
@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements AfterViewInit, OnDestroy {
  private revealSvc = inject(RevealService);
  activeFilter = signal('all');
 
  filters = [
    { key: 'all',       label: 'All Work'   },
    { key: 'web',       label: 'Web'        },
    { key: 'ai',        label: 'AI/ML'      },
    { key: 'mobile',    label: 'Mobile'     },
    { key: 'game',      label: 'Games'      },
    { key: 'marketing', label: 'Marketing'  },
  ];
 
  projects: Project[] = [
    { cat: 'AI / MACHINE LEARNING', emoji: '🤖', title: 'COGNITO — ENTERPRISE AI COPILOT', sub: 'RAG-powered assistant across 40,000 employees. 68% ticket reduction.', bg: 'linear-gradient(135deg,#0a0a20,#0d2040)', span: 'p-card-a', tall: false },
    { cat: 'WEB PLATFORM', emoji: '🚀', title: 'LAUNCHPAD SaaS', sub: 'B2B analytics. 12K DAU at launch.', bg: 'linear-gradient(135deg,#0a1520,#0a2015)', span: 'p-card-b p-card--tall', tall: true },
    { cat: 'MOBILE APP', emoji: '📱', title: 'FINFLOW BANKING', sub: 'Neo-bank UI. 4.8★ App Store.', bg: 'linear-gradient(135deg,#150a20,#200a15)', span: 'p-card-c' },
    { cat: 'WEB PLATFORM', emoji: '🏥', title: 'MEDPORT HEALTHCARE', sub: '200+ clinic patient management.', bg: 'linear-gradient(135deg,#1a100a,#0a0a1a)', span: 'p-card-d' },
    { cat: 'GAME DEVELOPMENT', emoji: '🎮', title: 'NEON DRIFT', sub: '80K players first month.', bg: 'linear-gradient(135deg,#0a1a0a,#1a0a20)', span: 'p-card-e' },
    { cat: 'DIGITAL MARKETING', emoji: '📈', title: 'GROWTHOPS — 10X REVENUE', sub: '₹2Cr → ₹22Cr ARR in 9 months.', bg: 'linear-gradient(135deg,#1a0a0a,#0a1a10)', span: 'p-card-f' },
  ];
 
  visibleProjects = signal(this.projects);
 
  numbers = [
    { val: '₹ N/A', label: 'Client revenue generated through our platforms', cls: 'pn-val c-g' },
    { val: '1M+',    label: 'End users actively using systems we\'ve built',    cls: 'pn-val c-plasma' },
    { val: '99.97%',  label: 'Average uptime across all production systems',     cls: 'pn-val c-acid' },
  ];
 
  setFilter(key: string) {
    this.activeFilter.set(key);
    this.visibleProjects.set(
      key === 'all' ? this.projects : this.projects.filter(p => p.cat.toLowerCase().includes(key))
    );
    setTimeout(() => this.revealSvc.init(), 50);
  }
 
  ngAfterViewInit() { this.revealSvc.init(); }
  ngOnDestroy()     { this.revealSvc.destroy(); }
}