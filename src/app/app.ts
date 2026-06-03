import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { LoaderComponent } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
 isLoading = signal(true);

  ngOnInit(): void {
    // Loader shows for 2.8 seconds on first app load
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2800);
  }

  onLoadComplete(): void {
    this.isLoading.set(false);
  }

}