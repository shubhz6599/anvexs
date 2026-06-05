import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);

  private add(message: string, type: Toast['type'], duration = 3000) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.toasts.update(t => [...t, { id, message, type }]);
    if (duration > 0) setTimeout(() => this.removeToast(id), duration);
  }

  success(msg: string) { this.add(msg, 'success'); }
  error(msg: string)   { this.add(msg, 'error', 5000); } // errors stay longer
  info(msg: string)    { this.add(msg, 'info'); }
  warning(msg: string) { this.add(msg, 'warning', 4000); }

  removeToast(id: string) {
    this.toasts.update(t => t.filter(x => x.id !== id));
  }
}