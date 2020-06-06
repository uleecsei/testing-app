import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import {QuizzesService} from '../../services/quizzes/quizzes.service';
import {log} from 'util';
@Component({
  selector: 'app-my-quiz-card',
  templateUrl: './my-quiz-card.component.html',
  styleUrls: ['./my-quiz-card.component.scss']
})
export class MyQuizCardComponent implements OnInit {
  @Input() quiz;
  user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private quizzesService: QuizzesService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['home/editQuiz', this.quiz._id], {state: {quiz: this.quiz, isSinglePlayer: true}});
  }

  practice() {
    this.router.navigate(['home/takeQuiz', this.quiz._id], {state: {quiz: this.quiz, isSinglePlayer: true}});
  }

  deleteQuiz() {
    this.quizzesService.deleteQuiz(this.quiz._id);
  }

}
