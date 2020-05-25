import { Component, OnInit } from '@angular/core';
import {Topics} from '../create-quiz/topics'
import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';

@Component({
  selector: 'app-my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.scss']
})
export class MyQuizzesComponent implements OnInit {
  quizzes;
  constructor(private quizzesService:QuizzesService) { }

  ngOnInit(): void {
    this.quizzesService.quizzes$.subscribe(res=>{
      this.quizzes=res;
    })
  }

}
