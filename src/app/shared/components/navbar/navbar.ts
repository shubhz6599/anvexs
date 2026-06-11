import {
  Component, OnInit, OnDestroy, signal,
  HostListener, inject, ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  auth = inject(AuthService);
  notify = inject(NotificationService);

  router = inject(Router);
  scrolled = signal(false);
  menuOpen = signal(false);
  profileOpen = signal(false);
  profileSaving = signal(false);
  selectedFile: File | null = null;
  previewUrl = signal<string | null>(null);
  @ViewChild('avatarInput') avatarInput!: ElementRef<HTMLInputElement>;

  pf = {
    firstName: '',
    lastName: '',
    phone: '',
    profilePicture: ''
  };
  private platformId = inject(PLATFORM_ID);
  navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Clients', path: '/testimonials' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];
  adminNavItems = [
  { label: 'News Letter', path: '/newsLetter' },
];
  removeImage: boolean = false;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMenu();

      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });

  }

  @HostListener('window:scroll')
  onScroll() {
    // this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
  openProfile() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lockScroll();
    console.log(this.auth.user());

    const user = this.auth.user();

    this.pf = {
      profilePicture: user?.profilePicture?.url || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || ''
    };

    this.profileOpen.set(true);
  }
  closeProfile() {
    this.profileOpen.set(false);
    this.unlockScroll();
  }


  async saveProfile() {
    const formData = new FormData();

    formData.append('firstName', this.pf.firstName);
    formData.append('lastName', this.pf.lastName);
    formData.append('phone', this.pf.phone);

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    if (this.removeImage) {
      formData.append('removeProfilePicture', 'true');
    }

    this.profileSaving.set(true);

    this.auth.updateProfile(formData).subscribe({
      next: (res: any) => {
        // this.profileSuccess.set('Profile updated successfully');
        // this.closeProfile();
        console.log(res)
        this.removeImage = false;

        localStorage.setItem('anvexs_user', JSON.stringify(res.data.user));
        this.notify.success(`${res.message}`);

      },
      error: (err) => {
        // this.profileError.set(
        //   err?.error?.message || 'Failed to update profile'
        // );
        this.notify.info(err?.error?.message || 'Failed to update profile');

      },
      complete: () => {
        this.profileSaving.set(false);
      }
    });
  }
  onAvatarChange(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
  removeAvatar() {
    this.selectedFile = null;
    this.previewUrl.set(null);
    this.pf.profilePicture = '';
    this.removeImage = true;

    // mark backend removal
  }

  triggerAvatarUpload() {
    this.avatarInput.nativeElement.click();
  }

  private lockScroll() {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const html = document.documentElement;

    body.style.overflow = 'hidden';
    body.style.height = '100vh';

    html.style.overflow = 'hidden';
    html.style.height = '100vh';

    // EXTRA: prevents iOS momentum scroll issues
    body.style.position = 'fixed';
    body.style.width = '100%';
  }

  private unlockScroll() {
    if (typeof document === 'undefined') return;

    const body = document.body;
    const html = document.documentElement;

    body.style.overflow = '';
    body.style.height = '';
    body.style.position = '';
    body.style.width = '';

    html.style.overflow = '';
    html.style.height = '';
  }
  ngOnDestroy() { }
}
