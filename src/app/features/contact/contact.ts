import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { EnquiryService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);
  private enquiry = inject(EnquiryService);
  submitting = signal(false);
  submitted = signal(false);

  form = { name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' };

  submitEnquiry() {
    if (!this.form.name || !this.form.email || !this.form.service || !this.form.message) {
      alert('Please fill all required fields');
      return;
    }
    this.submitting.set(true);
    this.enquiry.submit(this.form as any).subscribe({
      next: () => { this.submitted.set(true); this.form = { name: '', email: '', phone: '', company: '', service: '', budget: '', timeline: '', message: '' }; this.submitting.set(false); },
      error: () => { alert('Error submitting. Please try again.'); this.submitting.set(false); },
    });
  }

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}