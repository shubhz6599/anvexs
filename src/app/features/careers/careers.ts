import { Component, AfterViewInit, OnDestroy, inject, signal, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { CareerService } from '../../core/services/api.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  careerSvc = inject(CareerService);
  submitted = signal(false);
  cvFile: File | null = null;
  formData = {
    name: '', email: '', phone: '', position: '', experience: 0,
    linkedin: '', portfolio: '', coverLetter: ''
  };

  jobs = [
    { title: 'Senior Full-Stack Developer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '3-6 years', description: 'Lead architecture and development of high-performance web platforms.', skills: ['Angular', 'Node.js', 'MongoDB', 'AWS'] },
    { title: 'AI/ML Engineer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '2-5 years', description: 'Build production AI systems and LLM-powered applications.', skills: ['Python', 'LangChain', 'TensorFlow', 'FastAPI'] },
    { title: 'UI/UX Designer', type: 'full_time', department: 'Design', location: 'Remote', experience: '2-4 years', description: 'Design delightful user experiences for enterprise products.', skills: ['Figma', 'Adobe XD', 'Motion Design'] },
    { title: 'React Native Developer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '2-4 years', description: 'Build cross-platform mobile experiences.', skills: ['React Native', 'TypeScript', 'Firebase'] },
    { title: 'DevOps / Cloud Engineer', type: 'full_time', department: 'Engineering', location: 'Remote', experience: '3-6 years', description: 'Architect and maintain scalable cloud infrastructure.', skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker'] },
    { title: 'Software Development Intern', type: 'internship', department: 'Engineering', location: 'Remote', experience: '0 years', description: '3-month paid internship to level up your skills.', skills: ['Any Stack', 'Eagerness to Learn'] },
  ];

  internshipBenefits = [
    { icon: '💰', title: 'Free Internship', desc: 'Competitive internship stipend + bonus on successful completion.' },
    { icon: '👨‍💼', title: 'Real Mentorship', desc: 'Learn directly from senior engineers building production systems.' },
    { icon: '🎓', title: 'Certificate', desc: 'Industry-recognized certificate of completion.' },
    { icon: '🚀', title: 'Live Projects', desc: 'Work on real client projects with real deadlines.' },
    { icon: '📊', title: 'Performance Review', desc: 'Detailed feedback to guide your engineering growth.' },
    { icon: '🔗', title: 'Placement Referral', desc: 'Strong performers get permanent job offers.' },
  ];
  private applySection = viewChild<ElementRef>('applySection');


  submitApplication() {
    const errors = this.validateCareerForm();
    if (errors.length) {
      alert(errors.join('\n'));
      return;
    }

    const formData = new FormData();

    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('phone', this.formData.phone);
    formData.append('position', this.formData.position);
    formData.append('experience', String(this.formData.experience));
    formData.append('linkedInUrl', this.formData.linkedin);
    formData.append('portfolioUrl', this.formData.portfolio);
    formData.append('coverLetter', this.formData.coverLetter);

    // IMPORTANT: file must be appended like this
    if (this.cvFile) {
      formData.append('cv', this.cvFile);
    }

    this.careerSvc.apply(formData).subscribe({
      next: () => {
        this.submitted.set(true);
        this.formData = {
          name: '', email: '', phone: '', position: '',
          experience: 0, linkedin: '', portfolio: '', coverLetter: ''
        };
        this.cvFile = null;
      },
      error: (err) => alert(err.error?.message || 'Error submitting application'),
    });
  }

  validateCareerForm() {
    const errors = [];

    if (!this.formData.name) errors.push('Name required');
    if (!this.formData.email) errors.push('Email required');
    if (!this.formData.position) errors.push('Position required');
    if (!this.cvFile) errors.push('CV required');
    if (!this.formData.phone) errors.push('Phone required');
    if (!this.formData.email.includes('@')) errors.push('Invalid email');
    if (this.formData.phone.length < 10) errors.push('Invalid phone');

    return errors;
  }

  onCVSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) this.cvFile = file;
  }

  scrollToApply() {
    setTimeout(() => {
      this.applySection()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy() { this.reveal.destroy(); }
}
