import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tasksCount = 3;

  genderCode = 0;

  male() { this.genderCode = 0; }
  female() { this.genderCode = 1; }
  other() { this.genderCode = 2; }

  today: number = Date.now();

  company = "Lokalise";
  created_by = $localize`Created by ${this.company}`;
}
