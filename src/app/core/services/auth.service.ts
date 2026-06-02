// ============================================
// ANVEXS - Auth Service (Signals-based)
// ============================================
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: { user: User; accessToken: string; refreshToken: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private _user = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());
  readonly isAdmin = computed(() => this._user()?.role === 'admin');

  constructor(private http: HttpClient, private router: Router) {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const token = localStorage.getItem('anvexs_access_token');
    const user = localStorage.getItem('anvexs_user');
    if (token && user) {
      this._accessToken.set(token);
      this._user.set(JSON.parse(user));
    }
  }

  register(payload: {
    firstName: string; lastName: string; email: string; password: string; phone?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, payload).pipe(
      tap(res => res.success && this.storeSession(res.data))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => res.success && this.storeSession(res.data))
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe();
    this.clearSession();
    this.router.navigate(['/']);
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = localStorage.getItem('anvexs_refresh_token');
    return this.http
      .post<{ success: boolean; data: { accessToken: string; refreshToken: string } }>(
        `${this.apiUrl}/refresh`, { refreshToken }
      )
      .pipe(
        tap(res => {
          localStorage.setItem('anvexs_access_token', res.data.accessToken);
          localStorage.setItem('anvexs_refresh_token', res.data.refreshToken);
          this._accessToken.set(res.data.accessToken);
        }),
        map(res => res.data.accessToken)
      );
  }

  getAccessToken(): string | null {
    return this._accessToken();
  }

  private storeSession(data: { user: User; accessToken: string; refreshToken: string }): void {
    localStorage.setItem('anvexs_access_token', data.accessToken);
    localStorage.setItem('anvexs_refresh_token', data.refreshToken);
    localStorage.setItem('anvexs_user', JSON.stringify(data.user));
    this._accessToken.set(data.accessToken);
    this._user.set(data.user);
  }

  private clearSession(): void {
    localStorage.removeItem('anvexs_access_token');
    localStorage.removeItem('anvexs_refresh_token');
    localStorage.removeItem('anvexs_user');
    this._accessToken.set(null);
    this._user.set(null);
  }
}