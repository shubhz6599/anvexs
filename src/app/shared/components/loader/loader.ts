import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class LoaderComponent implements OnInit, OnDestroy {
  @Output() loadComplete = new EventEmitter<void>();

  startAnimation = false;
  isFadingOut = false;
  progress = 0;

  private progressInterval?: ReturnType<typeof setInterval>;
  private animTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    // Start animation after brief paint delay
    this.animTimeout = setTimeout(() => {
      this.startAnimation = true;
      this.startProgress();
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.progressInterval);
    clearTimeout(this.animTimeout);
  }

  private startProgress(): void {
    const duration = 2000;
    const interval = 40;
    const steps = duration / interval;
    let step = 0;

    this.progressInterval = setInterval(() => {
      step++;
      // Ease the progress: fast initially, slow at end
      this.progress = Math.round(Math.min(100, (step / steps) * 110));

      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.progressInterval);
        setTimeout(() => {
          this.isFadingOut = true;
          setTimeout(() => this.loadComplete.emit(), 600);
        }, 300);
      }
    }, interval);
  }
}

