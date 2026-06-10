import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { NotificationService } from './notification.service';
import { tap, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class InitialService {
  private readonly apiUrl = `${environment.apiUrl1}`;

  constructor(private http: HttpClient) { }

  getRoot(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHealth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/health`);
  }
}

  @Injectable({ providedIn: 'root' })
  export class EnquiryService {
  private http = inject(HttpClient);
  private loading = inject(LoadingService);
  private notify = inject(NotificationService);

  submit(data: any) {
    this.loading.show();
    return this.http.post(`${environment.apiUrl}/enquiries`, data).pipe(
      tap(res => {
        this.notify.success('Enquiry submitted successfully!');
      }),
      finalize(() => this.loading.hide())
    );
  }
}

@Injectable({ providedIn: 'root' })
export class OtpService {
  private http = inject(HttpClient);
  private loading = inject(LoadingService);

  sendOTP(email: string, purpose: string) {
    this.loading.show();
    return this.http.post(`${environment.apiUrl}/otp/send`, {
      email, purpose
    }).pipe(
      finalize(() => this.loading.hide())
    );
  }

  verifyOTP(email: string, otp: string, purpose: string) {
    this.loading.show();
    return this.http.post(`${environment.apiUrl}/otp/verify`, {
      email, otp, purpose
    }).pipe(
      finalize(() => this.loading.hide())
    );
  }
}

@Injectable({ providedIn: 'root' })
export class CareerService {
  private http = inject(HttpClient);
  private loading = inject(LoadingService);
  private notify = inject(NotificationService);

  getOpenings() {
    this.loading.show();
    return this.http.get(`${environment.apiUrl}/careers/openings`).pipe(
      finalize(() => this.loading.hide())
    );
  }

  apply(data: FormData) {
    this.loading.show();
    return this.http.post(`${environment.apiUrl}/careers/apply`, data).pipe(
      tap(() => {
        this.notify.success('Application submitted! We\'ll review within 5 days');
      }),
      finalize(() => this.loading.hide())
    );
  }

  getApplications(page = 1, limit = 20) {
    this.loading.show();
    return this.http.get(`${environment.apiUrl}/careers?page=${page}&limit=${limit}`).pipe(
      finalize(() => this.loading.hide())
    );
  }

  updateStatus(id: string, status: string) {
    this.loading.show();
    return this.http.put(`${environment.apiUrl}/careers/${id}`, { status }).pipe(
      tap(() => {
        this.notify.success('Status updated');
      }),
      finalize(() => this.loading.hide())
    );
  }
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private loading = inject(LoadingService);
  private notify = inject(NotificationService);

  subscribe(email: string) {
    this.loading.show();
    return this.http.post(`${environment.apiUrl}/blog/subscribe`, { email }).pipe(
      tap(() => {
        this.notify.success('Subscribed! Check your email');
      }),
      finalize(() => this.loading.hide())
    );
  }

  getArticles(page = 1) {
    this.loading.show();
    return this.http.get(`${environment.apiUrl}/blog/articles?page=${page}`).pipe(
      finalize(() => this.loading.hide())
    );
  }

  getArticleById(id: string) {
    this.loading.show();
    return this.http.get(`${environment.apiUrl}/blog/articles/${id}`).pipe(
      finalize(() => this.loading.hide())
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private http = inject(HttpClient);

  private api =
    `${environment.apiUrl}/auth`;

  createNewsletter(formData: FormData) {
    return this.http.post(
      `${this.api}/newsletters`,
      formData
    );
  }
}
