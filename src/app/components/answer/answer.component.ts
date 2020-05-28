import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';

const answerStyle = {
  correct: { 'background-image': 'linear-gradient(298deg,rgb(35, 250, 35), #8ceb94)' },
  incorrect: { 'background-image': 'linear-gradient(298deg,rgb(255, 107, 107), #ff3300)' }
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() index;
  @Input() answer;
  @Input() type;
  @Input() qId;
  submitted;

  isCorrect = () => (this.answer.isCorrect) ? answerStyle.correct : answerStyle.incorrect

  constructor(private answerService: AnswersService) { }
  ngOnInit(): void {
    this.answerService.isAnswered$.subscribe(val => {
      this.submitted = val
    })
  }
  log(event) { this.answerService.answer(this) }
}
