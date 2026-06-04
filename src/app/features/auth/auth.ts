import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth  {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  tab = signal<'login' | 'register'>('login');
  authLoading = signal(false);
  error = signal('');

  loginForm = { email: '', password: '' };
  registerForm = { firstName: '', lastName: '', email: '', password: '', phone: '' };

  setTab(t: 'login' | 'register') {
    this.tab.set(t);
    this.error.set('');
  }

  login() {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.authLoading.set(true);
    this.error.set('');

    this.auth.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => {
        this.notify.success('Logged in successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Login failed';
        this.error.set(msg);
        this.notify.error(msg);
        this.authLoading.set(false);
      }
    });
  }

  register() {
    if (!this.registerForm.firstName || !this.registerForm.email || !this.registerForm.password) {
      this.error.set('Please fill in required fields');
      return;
    }

    if (this.registerForm.password.length < 8) {
      this.error.set('Password must be at least 8 characters');
      return;
    }

    this.authLoading.set(true);
    this.error.set('');

    this.auth.register(this.registerForm).subscribe({
      next: () => {
        this.notify.success('Account created! Please log in');
        this.tab.set('login');
        this.registerForm = { firstName: '', lastName: '', email: '', password: '', phone: '' };
        this.authLoading.set(false);
      },
      error: (err) => {
        const msg = err.error?.message || 'Registration failed';
        this.error.set(msg);
        this.notify.error(msg);
        this.authLoading.set(false);
      }
    });
  }
}
