// ============================================
// ANVEXS - Encryption HTTP Interceptor
// Encrypts outgoing request bodies and
// decrypts incoming encrypted responses.
// ============================================
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { EncryptionService } from '../services/encryption.service';
import { environment } from '../../../environments/environment';

export const encryptionInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Only encrypt requests to our own API
  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const encryptionSvc = inject(EncryptionService);

  // Encrypt request body (skip GET/DELETE and non-body requests)
  let modifiedReq = req;
  if (req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const encryptedBody = encryptionSvc.wrapRequest(req.body);
    modifiedReq = req.clone({
      body: encryptedBody,
      setHeaders: { 'X-Encrypted': 'true' },
    });
  } else {
    modifiedReq = req.clone({
      setHeaders: { 'X-Encrypted': 'true' },
    });
  }

  // Decrypt response body
  return next(modifiedReq).pipe(
    map(event => {
      if (event instanceof HttpResponse && event.body && (event.body as { data?: string }).data) {
        const decrypted = encryptionSvc.unwrapResponse<unknown>(event.body as { data: string });
        return event.clone({ body: decrypted });
      }
      return event;
    })
  );
};