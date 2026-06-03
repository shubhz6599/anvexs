import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { CareerService } from '../../core/services/api.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  careerSvc = inject(CareerService);
  submitted = signal(false);

  formData = {
    name: '', email: '', phone: '', position: '', experience: 0,
    linkedin: '', portfolio: '', coverLetter: ''
  };

  jobs = [
    { title: 'Senior Full-Stack Developer', type: 'full_time', department: 'Engineering', location: 'Remote/Hyderabad', experience: '3-6 years', description: 'Lead architecture and development of high-performance web platforms.', skills: ['Angular', 'Node.js', 'MongoDB', 'AWS'] },
    { title: 'AI/ML Engineer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '2-5 years', description: 'Build production AI systems and LLM-powered applications.', skills: ['Python', 'LangChain', 'TensorFlow', 'FastAPI'] },
    { title: 'UI/UX Designer', type: 'full_time', department: 'Design', location: 'Hyderabad', experience: '2-4 years', description: 'Design delightful user experiences for enterprise products.', skills: ['Figma', 'Adobe XD', 'Motion Design'] },
    { title: 'React Native Developer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '2-4 years', description: 'Build cross-platform mobile experiences.', skills: ['React Native', 'TypeScript', 'Firebase'] },
    { title: 'DevOps / Cloud Engineer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '3-6 years', description: 'Architect and maintain scalable cloud infrastructure.', skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker'] },
    { title: 'Software Development Intern', type: 'internship', department: 'Engineering', location: 'Remote', experience: '0 years', description: '3-month paid internship to level up your skills.', skills: ['Any Stack', 'Eagerness to Learn'] },
  ];

  internshipBenefits = [
    { icon: '💰', title: '₹20K/month', desc: 'Competitive internship stipend + bonus on successful completion.' },
    { icon: '👨‍💼', title: 'Real Mentorship', desc: 'Learn directly from senior engineers building production systems.' },
    { icon: '🎓', title: 'Certificate', desc: 'Industry-recognized certificate of completion.' },
    { icon: '🚀', title: 'Live Projects', desc: 'Work on real client projects with real deadlines.' },
    { icon: '📊', title: 'Performance Review', desc: 'Detailed feedback to guide your engineering growth.' },
    { icon: '🔗', title: 'Placement Referral', desc: 'Strong performers get permanent job offers.' },
  ];

  submitApplication() {
    if (!this.formData.name || !this.formData.email || !this.formData.position) {
      alert('Please fill in all required fields');
      return;
    }
    this.careerSvc.apply(this.formData as any).subscribe({
      next: () => { this.submitted.set(true); this.formData = { name: '', email: '', phone: '', position: '', experience: 0, linkedin: '', portfolio: '', coverLetter: '' }; },
      error: (err) => alert('Error submitting application: ' + err.message),
    });
  }

  scrollToApply() {
    setTimeout(() => {
      document.querySelector('[#applySection]')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}