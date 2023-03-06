import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  localesList = [
    { code: 'en-US', label: 'English' },
    { code: 'ru', label: 'Русский' }
  ];
}
