// ============================================
// ANVEXS - AES Encryption Service (Angular)
// Mirrors the backend encryption middleware.
// ============================================
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EncryptionService {
  private readonly secretKey: string;
  private readonly iv: string;

  constructor() {
    this.secretKey = environment.aesKey;
    this.iv = environment.aesIv;
  }

  private getKeyAndIV() {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey.padEnd(32, '0').slice(0, 32));
    const iv  = CryptoJS.enc.Utf8.parse(this.iv.padEnd(16, '0').slice(0, 16));
    return { key, iv };
  }

  encrypt(data: unknown): string {
    const { key, iv } = this.getKeyAndIV();
    const plainText = typeof data === 'string' ? data : JSON.stringify(data);
    return CryptoJS.AES.encrypt(plainText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  decrypt(cipherText: string): unknown {
    const { key, iv } = this.getKeyAndIV();
    const bytes = CryptoJS.AES.decrypt(cipherText, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  }

  wrapRequest(body: unknown): { data: string } {
    return { data: this.encrypt(body) };
  }

  unwrapResponse<T>(response: { data: string }): T {
    return this.decrypt(response.data) as T;
  }
}