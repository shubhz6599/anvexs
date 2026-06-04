import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';
import { LoaderComponent } from './shared/components/loader/loader';
import { InitialService } from './core/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isLoading = signal(true);
  private intlService = inject(InitialService);
  constructor() {
    this.intlService.getRoot().subscribe((res: any) => {
      console.log(res)
    })
  }

  ngOnInit(): void {
    setTimeout(() => this.isLoading.set(false), 2800);
  }

  onLoadComplete(): void {
    this.isLoading.set(false);
  }
}
