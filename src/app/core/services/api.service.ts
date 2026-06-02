// ============================================
// ANVEXS - API Services
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// ── Enquiry Service ──────────────────────────
export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly apiUrl = `${environment.apiUrl}/enquiries`;

  constructor(private http: HttpClient) {}

  submit(payload: EnquiryPayload): Observable<{ success: boolean; message: string; data: unknown }> {
    return this.http.post<{ success: boolean; message: string; data: unknown }>(this.apiUrl, payload);
  }
}

// ── OTP Service ──────────────────────────────
@Injectable({ providedIn: 'root' })
export class OtpService {
  private readonly apiUrl = `${environment.apiUrl}/otp`;

  constructor(private http: HttpClient) {}

  sendOTP(email: string, purpose: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/send`, { email, purpose });
  }

  verifyOTP(email: string, otp: string, purpose: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/verify`, { email, otp, purpose });
  }
}

// ── Career Service ───────────────────────────
export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  skills: string[];
  posted: Date;
}

export interface CareerApplication {
  applicantName: string;
  email: string;
  phone?: string;
  jobTitle: string;
  jobType: string;
  experience?: number;
  skills?: string[];
  coverLetter?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class CareerService {
  private readonly apiUrl = `${environment.apiUrl}/careers`;

  constructor(private http: HttpClient) {}

  getOpenings(): Observable<{ success: boolean; data: { openings: JobOpening[] } }> {
    return this.http.get<{ success: boolean; data: { openings: JobOpening[] } }>(`${this.apiUrl}/openings`);
  }

  apply(payload: CareerApplication): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/apply`, payload);
  }
}