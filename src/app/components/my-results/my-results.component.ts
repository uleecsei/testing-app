import { Component, OnInit } from '@angular/core';
import { ResultsService } from 'src/app/services/results/results.service';
import Result from 'src/app/services/results/Result';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-my-results',
  templateUrl: './my-results.component.html',
  styleUrls: ['./my-results.component.scss']
})
export class MyResultsComponent implements OnInit {
  user;
  resultsList: Result[] = [];

  constructor(
    private resultService: ResultsService,
    private userService: UserService,
    ) {
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  ngOnInit(): void {
    this.resultsList = this.resultService.countPercentage(this.resultService.getResults());
  }

}
