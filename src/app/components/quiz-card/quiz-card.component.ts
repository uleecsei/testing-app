import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() quiz;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  practice() {
    this.router.navigate(['home/takeQuiz', this.quiz._id], {state: {quiz: this.quiz,isSinglePlayer:true}});
  }

  playWithFriends(){
    // Join the room via service
    this.router.navigate(['home/joinRoom'],{state: {quiz: this.quiz}})
    return;
  }

}
