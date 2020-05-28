import { Component, OnInit } from '@angular/core';

import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  quizzes$: Observable<any[]>;
  search: string;

  constructor(private quizzesService: QuizzesService) {
    //this.quizzes$ = this.quizzesService.getAllQuizzesArray();
   this.quizzes$=this.quizzesService.quizzes$;
  }

  ngOnInit(): void {

  }

}
