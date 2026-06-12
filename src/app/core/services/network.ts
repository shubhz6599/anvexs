import {
  Injectable,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  isPlatformBrowser
} from '@angular/common';

import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Network {

  private platformId = inject(PLATFORM_ID);

  private onlineStatus = new BehaviorSubject(true);

  online$ = this.onlineStatus.asObservable();

  constructor() {

    if (isPlatformBrowser(this.platformId)) {

      this.onlineStatus.next(navigator.onLine);

      window.addEventListener('online', () => {
        this.onlineStatus.next(true);
      });

      window.addEventListener('offline', () => {
        this.onlineStatus.next(false);
      });

    }

  }

}
