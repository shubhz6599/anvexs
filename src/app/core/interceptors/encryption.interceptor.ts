// encryption.interceptor.ts

import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { EncryptionService } from '../services/encryption.service';

export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {
  const encryption = inject(EncryptionService);

  if (
    ['POST', 'PUT', 'PATCH'].includes(req.method) &&
    req.body
  ) {
    const encrypted = encryption.wrapRequest(req.body);

    req = req.clone({
      body: encrypted,
      setHeaders: {
        'X-Encrypted': 'true'
      }
    });
  }

  return next(req);
};