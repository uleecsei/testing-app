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
<<<<<<< HEAD
    this.answerService.isAnswered$.subscribe(val => {
      this.submitted = val
||||||| merged common ancestors
  }
  log(event){
    console.log(event.target)
    console.log(this)
    console.log({
      answer:this.index,
      isCorrect:this.answer.isCorrect,
      qId:this.qId
=======
    this.answerService.goToNext$.subscribe(val => {
      this.submitted = val
>>>>>>> d8f62c81979f7bda54184be0542190ee182afee0
    })
  }
  log(event) { this.answerService.answer(this) }
}
