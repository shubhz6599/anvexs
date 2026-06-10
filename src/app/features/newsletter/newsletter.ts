import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../core/services/api.service';


@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.scss'
})
export class Newsletter {

  private newsletterService =
    inject(NewsletterService);

  loading = signal(false);

  selectedFile: File | null = null;

  campaign = {
    subject: '',
    content: '',
    scheduledFor: ''
  };

  onFileSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (
      input.files &&
      input.files.length
    ) {
      this.selectedFile =
        input.files[0];
    }
  }

  sendNewsletter(): void {

    if (!this.campaign.subject.trim()) {
      alert('Newsletter subject is required');
      return;
    }

    if (!this.campaign.content.trim()) {
      alert('Newsletter content is required');
      return;
    }

    if (!this.campaign.scheduledFor) {
      alert('Please select delivery date and time');
      return;
    }
    const localDate = new Date(this.campaign.scheduledFor).toISOString();;


    this.loading.set(true);

    const formData = new FormData();

    formData.append(
      'subject',
      this.campaign.subject
    );

    formData.append(
      'content',
      this.campaign.content
    );

    formData.append(
      'scheduledFor',
      localDate
    );

    if (this.selectedFile) {

      formData.append(
        'attachment',
        this.selectedFile,
        this.selectedFile.name
      );
    }

    this.newsletterService
      .createNewsletter(formData)
      .subscribe({

        next: () => {

          alert(
            'Newsletter scheduled successfully'
          );

          this.resetForm();
          this.selectedFile = null
          this.loading.set(false);
        },

        error: err => {

          console.error(err);

          alert(
            'Failed to schedule newsletter'
          );

          this.loading.set(false);
        }
      });
  }

  resetForm(): void {

    this.campaign = {
      subject: '',
      content: '',
      scheduledFor: ''
    };

    this.selectedFile = null;
  }

}
