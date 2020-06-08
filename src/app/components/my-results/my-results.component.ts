import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results.service';
import Result from 'src/app/services/results/Result';
import { UserService } from '../../services/user/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss']
})
export class MyResultsComponent implements OnInit {
  user: User;
  resultsList: Result[] = [];

  constructor(
    private resultService: ResultsService,
    private userService: UserService,
    ) {
  }

  ngOnInit(): void {
    // this.resultsList = this.resultService.countPercentage(this.resultService.getResults());
    this.user = this.userService.getUser();
    this.user.tests.forEach((test) => {
      if (test.result && (test.result.correct || test.result.incorrect)){
        this.resultsList.push(test.result);
      }
    });
    console.log(this.resultsList);
  }

}
