import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OtpService } from '../../core/services/api.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private auth = inject(AuthService);
  private otp = inject(OtpService);
  private router = inject(Router);

  tab = signal<'login' | 'register'>('login');
  authLoading = signal(false);
  error = signal('');

  loginForm = { email: '', password: '' };
  registerForm = { firstName: '', lastName: '', email: '', password: '', phone: '' };

  setTab(t: 'login' | 'register') { this.tab.set(t); this.error.set(''); }

  login() {
    this.authLoading.set(true);
    this.error.set('');
    this.auth.login(this.loginForm.email, this.loginForm.password).subscribe({
      next: () => { this.router.navigate(['/']); this.authLoading.set(false); },
      error: (err) => { this.error.set(err.error?.message || 'Login failed'); this.authLoading.set(false); },
    });
  }

  register() {
    this.authLoading.set(true);
    this.error.set('');
    this.auth.register(this.registerForm).subscribe({
      next: () => {
        alert('Account created! Please verify your email.');
        this.otp.sendOTP(this.registerForm.email, 'email_verification').subscribe();
        this.tab.set('login');
        this.authLoading.set(false);
      },
      error: (err) => { this.error.set(err.error?.message || 'Registration failed'); this.authLoading.set(false); },
    });
  }
}