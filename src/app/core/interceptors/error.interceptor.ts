import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Don't toast on 401 - auth interceptor handles it
      if (err.status !== 401) {
        const msg = err.error?.message || err.error?.errors?.[0]?.msg || 'Something went wrong';
        notify.error(msg);
      }
      return throwError(() => err);
    })
  );
};