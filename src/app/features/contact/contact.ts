import { Component, AfterViewInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealService } from '../../core/services/reveal.service';
import { EnquiryService } from '../../core/services/api.service';
import { NotificationService } from '../../core/services/notification.service';

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
  private notify = inject(NotificationService);

  submitting = signal(false);
  submitted = signal(false);

  form = {
    name: '', email: '', phone: '', company: '',
    service: '', budget: '', timeline: '', message: ''
  };

  validateEnquiry() {
    const errors = [];

    if (!this.form.name || this.form.name.length < 3)
      errors.push('Name must be 3+ characters');
    if (!this.form.email || !this.form.email.includes('@'))
      errors.push('Valid email required');
    if (!this.form.service)
      errors.push('Select a service');
    if (!this.form.message || this.form.message.length < 20)
      errors.push('Message must be 20+ characters');
    if (this.form.phone && this.form.phone.length < 10)
      errors.push('Invalid phone number');

    return errors;
  }
  submitEnquiry() {
    const errors = this.validateEnquiry();
    if (errors.length > 0) {
      this.notify.error(errors[0]);
      return;
    }

    this.submitting.set(true);
    this.enquiry.submit(this.form as any).subscribe({
      next: (res) => {
        this.submitted.set(true);
        this.notify.success('Enquiry sent! We\'ll contact you soon');
        this.submitting.set(false);
      },
      error: (err) => {
        this.notify.error(err.error?.message || 'Error submitting enquiry');
        this.submitting.set(false);
      }
    });
  }

  resetForm() {
    this.submitted.set(false);
    this.form = {
      name: '', email: '', phone: '', company: '',
      service: '', budget: '', timeline: '', message: ''
    };
  }

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy() { this.reveal.destroy(); }
}
