import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../core/services/reveal.service';
 
@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class Testimonials implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
 
  testimonials = [
    { quote: 'Anvexs rebuilt our entire data platform in 10 weeks. Handles 2M events/day without breaking a sweat. Genuinely the best engineering team we\'ve worked with.', author: 'Rohan Sharma', role: 'CTO · QuantEx Analytics', initials: 'RS', grad: 'linear-gradient(135deg,#0af,#8b5cf6)' },
    { quote: 'The AI chatbot they built cut our support volume by 68% in the first month. RAG pipeline is remarkably accurate. Worth every rupee.', author: 'Aisha Patel', role: 'VP Product · Finova Bank', initials: 'AP', grad: 'linear-gradient(135deg,#b8ff00,#0af)' },
    { quote: 'We shipped a React Native app to 50K users with Anvexs. Zero crashes on launch day. Their QA process is unmatched.', author: 'Karan Luthra', role: 'Founder · MoveSmart', initials: 'KL', grad: 'linear-gradient(135deg,#8b5cf6,#0af)' },
    { quote: 'Anvexs helped 3 of my students build award-winning final year projects. Mentorship quality rivals any bootcamp in the country.', author: 'Dr. Radhika Nair', role: 'Professor · NIT Warangal', initials: 'DR', grad: 'linear-gradient(135deg,#ff3c5a,#ff9e6b)' },
    { quote: 'Google Ads ROAS went from 1.8x to 6.2x in 3 months. Marketing team at Anvexs are data scientists disguised as marketers.', author: 'Meera Joshi', role: 'CMO · DriftBrands', initials: 'MJ', grad: 'linear-gradient(135deg,#b8ff00,#ff3c5a)' },
    { quote: 'The Unity game they shipped for corporate training increased engagement by 340%. Never thought gamification would work this well.', author: 'Siddharth Tiwari', role: 'L&D Head · Cognito Corp', initials: 'ST', grad: 'linear-gradient(135deg,#0af,#8b5cf6)' },
  ];
 
  companies = ['QUANTEX', 'FINOVA', 'MOVESMART', 'DRIFTBRANDS', 'EDUREACH', 'ORBISOFT'];
 
  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); 
  }
  }