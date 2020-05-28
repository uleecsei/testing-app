import { Component, OnInit, Input } from '@angular/core';
import { Subscription, from, interval } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() currentQ; 
  constructor(private answerService: AnswersService) { }
  ngOnInit(): void {
  }
}
