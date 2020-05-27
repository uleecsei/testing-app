import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    this.router.navigate(['home/takeQuiz', this.quiz._id], {state: {quiz: this.quiz}});
  }

}
