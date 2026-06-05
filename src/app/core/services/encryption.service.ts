// File: core/services/encryption.service.ts

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  private key = environment.aesKey;
  private iv = environment.aesIv;

  encrypt(data: any): string {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(this.key),
      { iv: CryptoJS.enc.Utf8.parse(this.iv) }
    );
    return encrypted.toString();
  }

  decrypt<T>(encrypted: string): T {
    const decrypted = CryptoJS.AES.decrypt(
      encrypted,
      CryptoJS.enc.Utf8.parse(this.key),
      { iv: CryptoJS.enc.Utf8.parse(this.iv) }
    );
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }

  wrapRequest(data: any): { encrypted: string } {
    return { encrypted: this.encrypt(data) };
  }

  unwrapResponse<T>(response: any): T {
    if (response.encrypted) {
      return this.decrypt<T>(response.encrypted);
    }
    return response;
  }
}
