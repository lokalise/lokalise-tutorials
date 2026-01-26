import { Component, signal, LOCALE_ID, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  localesList = [
    { code: 'en-US', label: 'English' },
    { code: 'lv', label: 'Latviešu' }
  ];
  protected readonly title = signal('i18n-angular-lokalise');
  currentLocale = inject(LOCALE_ID);
}
