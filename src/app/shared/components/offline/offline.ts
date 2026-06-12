import { Component } from '@angular/core';

@Component({
  selector: 'app-offline',
  imports: [],
  templateUrl: './offline.html',
  styleUrl: './offline.scss',
})
export class Offline {
  retryConnection(): void {
  if (navigator.onLine) {
    window.location.reload();
  }
}
}
