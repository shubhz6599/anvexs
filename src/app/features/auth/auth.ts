import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

type Tab = 'login' | 'register' | 'otp';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
   private auth   = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  tab      = signal<Tab>('login');
  busy     = signal(false);
  error    = signal('');
  errs     = signal<Record<string, string>>({});
  otpEmail = '';
  otpCode  = '';

  loginF = { email: '', password: '' };
  regF   = { firstName: '', lastName: '', email: '', password: '', phone: '' };

  setTab(t: Tab) { this.tab.set(t); this.error.set(''); this.errs.set({}); }

  // ─── validate ───────────────────────────
  private validateLogin() {
    const e: Record<string, string> = {};
    if (!this.loginF.email.includes('@'))          e['email']    = 'Enter a valid email';
    if (this.loginF.password.length < 6)            e['password'] = 'Password too short';
    return e;
  }

  private validateReg() {
    const e: Record<string, string> = {};
    if (this.regF.firstName.trim().length < 2)      e['firstName'] = 'At least 2 characters';
    if (!this.regF.email.includes('@'))              e['email']     = 'Enter a valid email';
    if (this.regF.password.length < 8)              e['password']  = 'Minimum 8 characters';
    return e;
  }

  // ─── login ──────────────────────────────
  login() {
    const e = this.validateLogin();
    if (Object.keys(e).length) { this.errs.set(e); return; }

    this.busy.set(true); this.error.set('');
    this.auth.login(this.loginF.email, this.loginF.password).subscribe({
      next: res => {
        this.auth.setAuth(res);
        this.notify.success(`Welcome back, ${res.data?.user.firstName}!`);
        this.router.navigate(['/']);
        this.busy.set(false);
      },
      error: err => {
        this.error.set(err.error?.message || 'Login failed');
        this.busy.set(false);
      }
    });
  }

  // ─── register ───────────────────────────
  register() {
    const e = this.validateReg();
    if (Object.keys(e).length) { this.errs.set(e); return; }

    this.busy.set(true); this.error.set('');
    this.auth.register(this.regF).subscribe({
      next: () => {
        this.otpEmail = this.regF.email;
        this.notify.success('Account created! Check your email for OTP');
        this.sendOTP();
        this.busy.set(false);
      },
      error: err => {
        this.error.set(err.error?.message || 'Registration failed');
        this.busy.set(false);
      }
    });
  }

  sendOTP() {
    this.auth.sendOTP(this.otpEmail).subscribe({
      next: () => { this.setTab('otp'); },
      error: err => {
        this.notify.error('Failed to send OTP. Try again.');
      }
    });
  }

  resendOTP() {
    this.notify.info('Resending OTP…');
    this.sendOTP();
  }

  // ─── verify OTP ─────────────────────────
  verifyOTP() {
    if (this.otpCode.length !== 6) {
      this.errs.set({ otp: 'Enter the 6-digit code' }); return;
    }
    this.busy.set(true); this.error.set('');
    this.auth.verifyOTP(this.otpEmail, this.otpCode).subscribe({
      next: () => {
        this.notify.success('Email verified! Please sign in');
        this.loginF.email = this.otpEmail;
        this.setTab('login');
        this.busy.set(false);
      },
      error: err => {
        this.error.set(err.error?.message || 'Invalid OTP');
        this.busy.set(false);
      }
    });
  }
}