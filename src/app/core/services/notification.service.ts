import { Injectable, signal } from '@angular/core';

export interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    const id = Math.random().toString(36).substr(2, 9);
    this.toasts.update(t => [...t, { id, message, type }]);
    setTimeout(() => this.remove(id), duration);
  }

  remove(id: string) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string)   { this.show(msg, 'error'); }
  info(msg: string)    { this.show(msg, 'info'); }
}