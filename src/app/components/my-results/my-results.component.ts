import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results.service';
import Result from 'src/app/services/results/Result';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss']
})
export class MyResultsComponent implements OnInit {
  resultsList: Result[] = [];

  constructor(private resultService: ResultsService) { }

  ngOnInit(): void {
    this.resultsList = this.resultService.countPercentage(this.resultService.getResults());
  }

}
