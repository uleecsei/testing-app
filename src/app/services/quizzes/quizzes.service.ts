import { Injectable } from '@angular/core';
import { Topics } from 'src/app/components/create-quiz/topics';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { MessagesService } from '../messages/messages.service';

import { BehaviorSubject } from 'rxjs';
import {QuestionType} from '../../interfaces/quiz'
const myQuizzes = [
  {
    id: 1,
    title: "Noun",
    topic: Topics.Languages,
    questions: [
      { 
        qId:1,
        type:QuestionType.radio,
        question: "Are u ok?",
        answers: [
          {
            answer: "True",
            isCorrect: true
          },
          {
            answer: "False",
            isCorrect: false
          },
          {
            answer: "I dont know",
            isCorrect: false
          },

        ]

      },
      { qId:2,
        type:QuestionType.checkbox,
        question: "Favourite food?",
        answers: [
          {
            answer: "pizza",
            isCorrect: true
          },
          {
            answer: "sushi",
            isCorrect: true
          },
          {
            answer: "chocolate",
            isCorrect: false
          },

        ]

      }
    ]
  }, {
    id: 2,
    title: "Music",
    topic: Topics.Art,
    questions: []
  }, {
    id: 3,
    title: "Algebra",
    topic: Topics.Math,
    questions: []
  },

]
@Injectable({
  providedIn: 'root'
})

export class QuizzesService {
  url = environment.baseUrl;
  token;
  quizzes = myQuizzes;

  constructor(
    private http: HttpClient,
    private flash: MessagesService,
    private userService: UserService
  ) {
    this.token = userService.getToken();
  }

  createQuiz(form) {
    const myHeaders = new HttpHeaders().set('Authorization', this.token);
    console.log('Send form');
    this.http.post<any>(
      `${this.url}/api/tests`, form, {headers: myHeaders})
      .subscribe(
        data => {
          console.log(data);
          this.flash.showSuccess(data.status);
        },
        error => {
          console.log('Error maybe');
          console.log(error);
          // this.flash.showError(error.error.message);
        });
  }

  quizzes$: BehaviorSubject<any[]> = new BehaviorSubject(myQuizzes);

}
