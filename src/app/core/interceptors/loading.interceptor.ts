import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { environment } from '../../../environments/environment';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {

  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  // Skip loader for chatbot API
  const skipLoader =
    req.url.includes('/auth/chat');

  if (skipLoader) {
    return next(req);
  }

  const loading = inject(LoadingService);

  activeRequests++;
  loading.show();

  return next(req).pipe(
    finalize(() => {
      activeRequests--;

      if (activeRequests <= 0) {
        activeRequests = 0;
        loading.hide();
      }
    })
  );
};
