// Updated src/app/core/services/api.service.ts - COMPLETE

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

export interface CareerPayload {
  name: string;
  email: string;
  phone?: string;
  position: string;
  experience?: number;
  linkedin?: string;
  portfolio?: string;
  coverLetter?: string;
}

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly apiUrl = `${environment.apiUrl}/enquiries`;
  constructor(private http: HttpClient) {}

  submit(payload: EnquiryPayload): Observable<{ success: boolean; message: string; data: any }> {
    return this.http.post<any>(this.apiUrl, payload);
  }
}

@Injectable({ providedIn: 'root' })
export class OtpService {
  private readonly apiUrl = `${environment.apiUrl}/otp`;
  constructor(private http: HttpClient) {}

  sendOTP(email: string, purpose: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/send`, { email, purpose });
  }

  verifyOTP(email: string, otp: string, purpose: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/verify`, { email, otp, purpose });
  }
}

@Injectable({ providedIn: 'root' })
export class CareerService {
  private readonly apiUrl = `${environment.apiUrl}/careers`;
  constructor(private http: HttpClient) {}

  getOpenings(): Observable<{ success: boolean; data: { openings: any[] } }> {
    return this.http.get<any>(`${this.apiUrl}/openings`);
  }

  apply(payload: CareerPayload): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/apply`, payload);
  }
}