import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// NOTE: This interceptor only re-throws the error.
// Toast notifications are shown by individual components so we never double-toast.
// The only exception is truly unexpected 5xx server errors.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // Just re-throw — components handle their own error toasts
      return throwError(() => err);
    })
  );
};