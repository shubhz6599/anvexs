import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, finalize, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private get isBrowser() { return isPlatformBrowser(this.platformId); }

  private _accessToken  = signal<string | null>(this.read('anvexs_access_token'));
  private _refreshToken = signal<string | null>(this.read('anvexs_refresh_token'));
  private _user         = signal<User | null>(this.readUser());

  readonly user            = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._accessToken() && !!this._user());
  readonly isAdmin         = computed(() => this._user()?.role === 'admin');

  // ─── storage helpers ─────────────────────
  private read(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  private readUser(): User | null {
    const raw = this.read('anvexs_user');
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  }

  private save(at: string, rt: string, user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem('anvexs_access_token', at);
    localStorage.setItem('anvexs_refresh_token', rt);
    localStorage.setItem('anvexs_user', JSON.stringify(user));
  }

  private clear(): void {
    if (!this.isBrowser) return;
    ['anvexs_access_token', 'anvexs_refresh_token', 'anvexs_user'].forEach(k => localStorage.removeItem(k));
  }

  // ─── used by auth interceptor ─────────────
  getAccessToken(): string | null { return this._accessToken(); }

  refreshAccessToken(): Observable<string> {
    const rt = this._refreshToken();
    if (!rt) return throwError(() => new Error('No refresh token'));

    return new Observable(obs => {
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken: rt })
        .subscribe({
          next: res => {
            if (res.data) {
              this._accessToken.set(res.data.accessToken);
              if (this.isBrowser) localStorage.setItem('anvexs_access_token', res.data.accessToken);
              obs.next(res.data.accessToken);
              obs.complete();
            } else {
              obs.error(new Error('Refresh failed'));
            }
          },
          error: err => obs.error(err),
        });
    });
  }

  // ─── public API ───────────────────────────
  register(data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, data);
  }

  sendOTP(email: string) {
    return this.http.post(`${environment.apiUrl}/otp/send`, { email, purpose: 'email_verification' });
  }

  verifyOTP(email: string, otp: string) {
    return this.http.post(`${environment.apiUrl}/otp/verify`, { email, otp, purpose: 'email_verification' });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  setAuth(res: AuthResponse): void {
    if (!res.data) return;
    const { accessToken, refreshToken, user } = res.data;
    this._accessToken.set(accessToken);
    this._refreshToken.set(refreshToken);
    this._user.set(user);
    this.save(accessToken, refreshToken, user);
  }

  logout(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._user.set(null);
    this.clear();
    this.router.navigate(['/']);
  }

  getMe() {
    return this.http.get<AuthResponse>(`${environment.apiUrl}/auth/me`);
  }
}