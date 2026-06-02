import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  contactForm: FormGroup;
  submitted = signal(false);
  success = signal(false);

  contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      title: 'Email',
      content: 'hello@anvexs.com',
      link: 'mailto:hello@anvexs.com',
    },
    {
      icon: '📱',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: '📍',
      title: 'Office',
      content: 'San Francisco, USA',
    },
    {
      icon: '⏰',
      title: 'Hours',
      content: 'Mon - Fri, 9am - 6pm PST',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.contactForm.valid) {
      // In a real app, you would send this to your backend
      console.log('Form submitted:', this.contactForm.value);
      this.success.set(true);
      this.contactForm.reset();
      this.submitted.set(false);
      setTimeout(() => this.success.set(false), 3000);
    }
  }

  get name() {
    return this.contactForm.get('name');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get company() {
    return this.contactForm.get('company');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
  get message() {
    return this.contactForm.get('message');
  }
}
