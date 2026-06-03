import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An error occurred';

      if (error.status === 401) {
        message = 'Session expired. Please log in again.';
        router.navigate(['/auth']);
      } else if (error.status === 403) {
        message = 'You don\'t have permission to access this resource.';
      } else if (error.status === 404) {
        message = 'Resource not found.';
      } else if (error.status >= 500) {
        message = 'Server error. Please try again later.';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      notify.error(message);
      return throwError(() => error);
    })
  );
};