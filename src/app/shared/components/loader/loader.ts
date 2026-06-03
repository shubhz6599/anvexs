import { Component, OnInit, OnDestroy, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class LoaderComponent  implements OnInit, OnDestroy {
  progress = signal(0);
  isComplete = signal(false);
  loadComplete = output<void>();

  private animInterval?: ReturnType<typeof setInterval>;
  private completeTimeout?: ReturnType<typeof setTimeout>;

  Math = Math;

  ngOnInit() {
    // Simulate progress from 0 to 95%
    this.animInterval = setInterval(() => {
      this.progress.update(p => {
        if (p >= 95) return p;
        return p + Math.random() * 4 + 1;
      });
    }, 50);

    // Complete after 2.8s
  this.completeTimeout = setTimeout(() => {
  this.progress.set(100);

  setTimeout(() => {
    this.isComplete.set(true);

    setTimeout(() => {
      this.loadComplete.emit();
    }, 400);

  }, 350);

}, 2800);
  }

  ngOnDestroy() {
    if (this.animInterval) clearInterval(this.animInterval);
    if (this.completeTimeout) clearTimeout(this.completeTimeout);
  }
}