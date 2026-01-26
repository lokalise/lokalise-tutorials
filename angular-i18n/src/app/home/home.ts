import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasksCount = 2;
  genderCode = 0;
  today: number = Date.now();

  company = "Lokalise";
  created_by = $localize`Created by ${this.company}`;

  male() { this.genderCode = 0; }
  female() { this.genderCode = 1; }
  other() { this.genderCode = 2; }
}
