import { Component, OnInit, Input } from '@angular/core';
import{ Router,ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-my-quiz-card',
  templateUrl: './my-quiz-card.component.html',
  styleUrls: ['./my-quiz-card.component.scss']
})
export class MyQuizCardComponent implements OnInit {
  @Input() quiz
  
  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  practice(){
    this.router.navigate(['home/editQuiz', this.quiz.id]);
  }

}
