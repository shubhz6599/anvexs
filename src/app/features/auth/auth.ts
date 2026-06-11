import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import {

  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';
import { environment } from '../../../environments/environment';

declare const google: any;
type Tab = 'login' | 'register' | 'otp';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private auth = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  tab = signal<Tab>('login');
  busy = signal(false);
  error = signal('');
  errs = signal<Record<string, string>>({});
  showPwd = signal(false);

  otpEmail = '';
  otpCode = '';
  resendCooldown = signal(0);
  private cooldownTimer?: ReturnType<typeof setInterval>;

  loginF = { email: '', password: '' };
  regF = { firstName: '', lastName: '', email: '', password: '', phone: '' };

  // ── Forgot Password popup ─────────────────
  showForgotModal = signal(false);
  forgotStep = signal<'email' | 'reset'>('email');
  forgotBusy = signal(false);
  forgotError = signal('');
  forgotEmail = '';
  forgotNewPass = '';
  forgotConfirmPass = '';
  forgotOtp = '';
  forgotShowPwd = signal(false);

  // ── Change Password popup (for logged-in users) ──
  showChangeModal = signal(false);
  changeBusy = signal(false);
  changeError = signal('');
  changeCurrentPass = '';
  changeNewPass = '';
  changeConfirmPass = '';
  changeShowPwd = signal(false);
  platformId = inject(PLATFORM_ID);
  // ─── Tab switching ────────────────────────
  setTab(t: Tab) { this.tab.set(t); this.error.set(''); this.errs.set({}); this.showPwd.set(false); }

  get isLoggedIn() { return this.auth.isAuthenticated(); }
  get currentUser() { return this.auth.user(); }

  // ─── Validation ───────────────────────────
  private validateLogin() {
    const e: Record<string, string> = {};
    if (!this.loginF.email.includes('@')) e['email'] = 'Enter a valid email';
    if (this.loginF.password.length < 1) e['password'] = 'Password is required';
    return e;
  }
  private validateReg() {
    const e: Record<string, string> = {};
    if (this.regF.firstName.trim().length < 2) e['firstName'] = 'At least 2 characters';
    if (!this.regF.email.includes('@')) e['email'] = 'Enter a valid email';
    if (this.regF.password.length < 8) e['password'] = 'Minimum 8 characters';
    return e;
  }

  // ─── Password strength ────────────────────
  pwStrength(p: string): number {
    let s = 0;
    if (p.length >= 8) s += 25;
    if (p.length >= 12) s += 15;
    if (/[A-Z]/.test(p)) s += 20;
    if (/[0-9]/.test(p)) s += 20;
    if (/[^A-Za-z0-9]/.test(p)) s += 20;
    return Math.min(s, 100);
  }
  pwLevel(p: string): string {
    const s = this.pwStrength(p);
    if (s < 30) return 'weak'; if (s < 60) return 'fair'; if (s < 85) return 'good'; return 'strong';
  }
  pwLabel(p: string): string {
    return { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' }[this.pwLevel(p)] || '';
  }

  // ─── Login ────────────────────────────────
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
        if (err.error?.code === 'EMAIL_NOT_VERIFIED') {
          this.otpEmail = this.loginF.email;
          this.notify.info('Please verify your email first');
          this.sendOTPAndGo(this.loginF.email);
        } else {
          this.error.set(err.error?.message || 'Login failed');
        }
        this.busy.set(false);
      }
    });
  }

  // ─── Register ─────────────────────────────
  register() {
    const e = this.validateReg();
    if (Object.keys(e).length) { this.errs.set(e); return; }
    this.busy.set(true); this.error.set('');
    this.auth.register(this.regF).subscribe({
      next: () => {
        this.otpEmail = this.regF.email;
        this.notify.success('Account created! Check email for verification code');
        this.sendOTPAndGo(this.regF.email);
        this.busy.set(false);
      },
      error: err => {
        this.error.set(err.error?.message || 'Registration failed');
        this.busy.set(false);
      }
    });
  }

  sendOTPAndGo(email: string) {
    console.log(email)
    this.auth.sendOTP(email, 'email_verification').subscribe({
      next: () => {
        this.notify.info(`Code sent to ${email}`);
        this.setTab('otp');
        this.startResendCooldown();
      },
      error: err => { this.error.set(err.error?.message || 'Failed to send OTP'); }
    });
  }

  // ─── OTP Verify ───────────────────────────
  verifyOTP() {
    if (this.otpCode.length !== 6) { this.errs.set({ otp: 'Enter the 6-digit code' }); return; }
    this.busy.set(true); this.error.set('');
    this.auth.verifyOTP(this.otpEmail, this.otpCode, 'email_verification').subscribe({
      next: res => {
        if (res.data?.autoLogin && res.data.accessToken && res.data.refreshToken && res.data.user) {
          this.auth.setAuthRaw(res.data.accessToken, res.data.refreshToken, res.data.user);
          this.notify.success('Email verified! Welcome to Anvexs 🎉');
          this.router.navigate(['/']);
        } else {
          this.notify.success('Email verified! Please sign in');
          this.loginF.email = this.otpEmail;
          this.setTab('login');
        }
        this.busy.set(false);
      },
      error: err => { this.error.set(err.error?.message || 'Incorrect code'); this.busy.set(false); }
    });
  }

  resendOTP() {
    if (this.resendCooldown() > 0) return;
    this.auth.sendOTP(this.otpEmail, 'email_verification').subscribe({
      next: () => { this.notify.success('New code sent!'); this.startResendCooldown(); },
      error: err => { this.error.set(err.error?.message || 'Failed to resend'); }
    });
  }

  private startResendCooldown(s = 60) {
    this.resendCooldown.set(s);
    clearInterval(this.cooldownTimer);
    this.cooldownTimer = setInterval(() => {
      this.resendCooldown.update(v => { if (v <= 1) { clearInterval(this.cooldownTimer); return 0; } return v - 1; });
    }, 1000);
  }

  // ─── Forgot Password ──────────────────────
  openForgotModal() {
    this.forgotStep.set('email');
    this.forgotError.set('');
    this.forgotEmail = '';
    this.forgotNewPass = '';
    this.forgotConfirmPass = '';
    this.forgotOtp = '';
    this.showForgotModal.set(true);
    document.body.style.overflow = 'hidden';
  }
  closeForgotModal() {
    this.showForgotModal.set(false);
    document.body.style.overflow = '';
  }

  sendForgotOTP() {
    if (!this.forgotEmail.includes('@')) { this.forgotError.set('Enter a valid email'); return; }
    this.forgotBusy.set(true); this.forgotError.set('');
    this.auth.forgotPassword(this.forgotEmail).subscribe({
      next: () => {
        this.notify.info(`Reset code sent to ${this.forgotEmail}`);
        this.forgotStep.set('reset');
        this.forgotBusy.set(false);
      },
      error: err => { this.forgotError.set(err.error?.message || 'Failed to send code'); this.forgotBusy.set(false); }
    });
  }

  submitReset() {
    this.forgotError.set('');
    if (this.forgotOtp.length !== 6) { this.forgotError.set('Enter the 6-digit reset code'); return; }
    if (this.forgotNewPass.length < 8) { this.forgotError.set('Password must be at least 8 characters'); return; }
    if (this.forgotNewPass !== this.forgotConfirmPass) { this.forgotError.set('Passwords do not match'); return; }

    this.forgotBusy.set(true);
    this.auth.resetPassword(this.forgotEmail, this.forgotOtp, this.forgotNewPass).subscribe({
      next: () => {
        this.notify.success('Password reset successfully! Please sign in.');
        this.closeForgotModal();
        this.loginF.email = this.forgotEmail;
        this.setTab('login');
      },
      error: err => { this.forgotError.set(err.error?.message || 'Reset failed'); this.forgotBusy.set(false); }
    });
  }

  // ─── Change Password (logged-in) ─────────
  openChangeModal() {
    this.changeError.set('');
    this.changeCurrentPass = '';
    this.changeNewPass = '';
    this.changeConfirmPass = '';
    this.showChangeModal.set(true);
    document.body.style.overflow = 'hidden';
  }
  closeChangeModal() {
    this.showChangeModal.set(false);
    document.body.style.overflow = '';
  }

  submitChange() {
    this.changeError.set('');
    if (!this.changeCurrentPass) { this.changeError.set('Enter your current password'); return; }
    if (this.changeNewPass.length < 8) { this.changeError.set('New password must be at least 8 characters'); return; }
    if (this.changeNewPass !== this.changeConfirmPass) { this.changeError.set('Passwords do not match'); return; }
    if (this.changeCurrentPass === this.changeNewPass) { this.changeError.set('New password must be different'); return; }

    this.changeBusy.set(true);
    this.auth.changePassword(this.changeCurrentPass, this.changeNewPass).subscribe({
      next: () => {
        this.notify.success('Password changed successfully!');
        this.closeChangeModal();
      },
      error: err => { this.changeError.set(err.error?.message || 'Failed to change password'); this.changeBusy.set(false); }
    });
  }

  loginWithGoogle() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    console.log(environment.googleClientId);
    google.accounts.id.initialize({
      client_id: environment.googleClientId,

      callback: (response: any) => {

        this.auth.googleLogin(
          response.credential
        ).subscribe({

          next: (res) => {

            this.auth.setAuth(res);

            this.notify.success(
              'Welcome to Anvexs!'
            );

            this.router.navigate(['/']);
          },

          error: (err) => {

            this.error.set(
              err.error?.message ||
              'Google login failed'
            );
          }
        });
      }
    });

    google.accounts.id.prompt();
  }
}
