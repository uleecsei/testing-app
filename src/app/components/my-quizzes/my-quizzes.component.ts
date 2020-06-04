import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss']
})
export class MyQuizzesComponent implements OnInit {
  quizzes$: Observable<any[]>;

  constructor(private quizzesService: QuizzesService) {
    this.quizzes$ = this.quizzesService.getMyQuizzesArray();
  }

  ngOnInit(): void {
    this.quizzes$ = this.quizzesService.getMyQuizzesArray();
    console.log('From on init');
  }

}
