import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss']
})
export class MyQuizzesComponent implements OnInit {
  quizzes$: Observable<any[]>;
  constructor(private quizzesService: QuizzesService) { }

  ngOnInit(): void {
    this.quizzes$ = this.quizzesService.getMyQuizzesArray();
  }

}
