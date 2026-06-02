import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  isLogin = signal(true);
  loginForm: FormGroup;
  signupForm: FormGroup;
  submitted = signal(false);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  toggleMode(): void {
    this.isLogin.update(v => !v);
    this.submitted.set(false);
  }

  onLoginSubmit(): void {
    this.submitted.set(true);
    if (this.loginForm.valid) {
      // In a real app, you would authenticate with a backend
      console.log('Login:', this.loginForm.value);
      // Simulate successful login
      setTimeout(() => this.router.navigate(['/']), 500);
    }
  }

  onSignupSubmit(): void {
    this.submitted.set(true);
    if (this.signupForm.valid && this.signupForm.get('password')?.value === this.signupForm.get('confirm')?.value) {
         console.log('Signup:', this.signupForm.value);
      setTimeout(() => this.router.navigate(['/']), 500);
    }
  }
}
