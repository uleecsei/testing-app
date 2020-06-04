import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../services/user/user.service';
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
    private userService: UserService
  ) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  edit() {
    this.router.navigate(['home/editQuiz', this.quiz.id]);
  }
  practice() {
    this.router.navigate(['home/takeQuiz', this.quiz.id]);
  }

}
