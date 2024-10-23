import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { TranslocoDatePipe, TranslocoCurrencyPipe } from '@jsverse/transloco-locale';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoDirective, TranslocoDatePipe, TranslocoCurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  today = new Date();
  price = 1499.99;
  count = 0;

  increment() {
    this.count++;
  }
}
