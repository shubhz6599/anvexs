import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  _id: string; firstName: string; lastName: string;
  email: string; phone?: string; role: string;
  isVerified: boolean; profilePicture?: ProfilePic;
}
export interface ProfilePic {
  url: any,
  public_id: String
}
export interface AuthResponse {
  success: boolean; message: string;
  data?: { accessToken: string; refreshToken: string; user: User; };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private get isBrowser() { return isPlatformBrowser(this.platformId); }

  private _token = signal<string | null>(this.read('anvexs_access_token'));
  private _refresh = signal<string | null>(this.read('anvexs_refresh_token'));
  private _user = signal<User | null>(this.readUser());

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._token() && !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  private read(k: string): string | null { return this.isBrowser ? localStorage.getItem(k) : null; }
  private readUser(): User | null {
    try { const r = this.read('anvexs_user'); return r ? JSON.parse(r) : null; } catch { return null; }
  }
  private persist(at: string, rt: string, user: User) {
    if (!this.isBrowser) return;
    localStorage.setItem('anvexs_access_token', at);
    localStorage.setItem('anvexs_refresh_token', rt);
    localStorage.setItem('anvexs_user', JSON.stringify(user));
  }
  private wipe() {
    if (!this.isBrowser) return;
    ['anvexs_access_token', 'anvexs_refresh_token', 'anvexs_user'].forEach(k => localStorage.removeItem(k));
  }

  getAccessToken(): string | null { return this._token(); }

  refreshAccessToken(): Observable<string> {
    const rt = this._refresh();
    if (!rt) return throwError(() => new Error('No refresh token'));
    return new Observable(obs => {
      this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, { refreshToken: rt }).subscribe({
        next: res => {
          if (res.data) {
            this._token.set(res.data.accessToken);
            if (this.isBrowser) localStorage.setItem('anvexs_access_token', res.data.accessToken);
            obs.next(res.data.accessToken); obs.complete();
          } else obs.error(new Error('Refresh failed'));
        },
        error: e => obs.error(e),
      });
    });
  }

  register(data: any) { return this.http.post<{ success: boolean; message: string }>(`${environment.apiUrl}/auth/register`, data); }
  sendOTP(email: string, purpose = 'email_verification') { return this.http.post<any>(`${environment.apiUrl}/otp/send`, { email, purpose }); }
  verifyOTP(email: string, otp: string, purpose = 'email_verification') { return this.http.post<any>(`${environment.apiUrl}/otp/verify`, { email, otp, purpose }); }
  login(email: string, password: string) { return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password }); }
  forgotPassword(email: string) { return this.http.post<any>(`${environment.apiUrl}/auth/forgot-password`, { email }); }
  resetPassword(email: string, otp: string, newPassword: string) { return this.http.post<any>(`${environment.apiUrl}/auth/reset-password`, { email, otp, newPassword }); }
  changePassword(currentPassword: string, newPassword: string) { return this.http.post<any>(`${environment.apiUrl}/auth/change-password`, { currentPassword, newPassword }); }

  updateProfile(formData: FormData) {
    return this.http.put<{ success: boolean; message: string; data: { user: User } }>(`${environment.apiUrl}/auth/profile`, formData).pipe(
      tap(res => {
        if (res.data?.user) {
          this._user.set(res.data.user);
          if (this.isBrowser) localStorage.setItem('anvexs_user', JSON.stringify(res.data.user));
        }
      })
    );
  }

  setAuth(res: AuthResponse): void {
    if (!res.data) return;
    const { accessToken, refreshToken, user } = res.data;
    this._token.set(accessToken); this._refresh.set(refreshToken); this._user.set(user);
    this.persist(accessToken, refreshToken, user);
  }
  setAuthRaw(at: string, rt: string, user: User): void {
    this._token.set(at); this._refresh.set(rt); this._user.set(user);
    this.persist(at, rt, user);
  }
  logout(): void {
    this._token.set(null); this._refresh.set(null); this._user.set(null);
    this.wipe(); this.router.navigate(['/']);
  }
  googleLogin(token: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/google`,
      { token }
    );
  }
}
