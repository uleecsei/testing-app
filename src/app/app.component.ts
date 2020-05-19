import { Component } from '@angular/core';
import { TestService } from './shared/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'testing-app';
  status: string;
  constructor(private test: TestService) {
    this.test.getTest().subscribe((data) => {
      this.status = data.test;
    });
  }
}
