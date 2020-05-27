import { Injectable } from '@angular/core';
import { Topics } from 'src/app/components/create-quiz/topics';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../messages/messages.service';
import { BehaviorSubject, interval } from 'rxjs';
import {QuestionType} from '../../interfaces/quiz';
const myQuizzes = [
  {
    id: 1,
    title: 'Noun',
    topic: Topics.Languages,
    questions: [
      { 
        qId:1,
        type:QuestionType.radio,
        time:6000,
        question: "Are u ok?",
        answers: [
          {
            answer: 'True',
            isCorrect: true
          },
          {
            answer: 'False',
            isCorrect: false
          },
          {
            answer: 'I dont know',
            isCorrect: false
          },
        ]

      },
      { qId:2,
        type:QuestionType.checkbox,
        question: "Favourite food?",
        time:5000,
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

      }, { qId:3,
        type:QuestionType.checkbox,
        question: "Favourite drink?",
        time:5000,
        answers: [
          {
            answer: "water",
            isCorrect: true
          },
          {
            answer: "coke",
            isCorrect: true
          },
          {
            answer: "beer",
            isCorrect: false
          },

        ]

      }
    ]
  }
  ];

@Injectable({
  providedIn: 'root'
})

export class QuizzesService  {

  constructor(
    private http: HttpClient,
    private flash: MessagesService
  ) {
    this.getUserQuizzes();
    this.getAllQuizzes();
    console.log(this.allQuizzes.value);
    console.log(this.myQuizzes.value);
  }
  url = environment.baseUrl;
  allQuizzes = new BehaviorSubject([]);
  myQuizzes = new BehaviorSubject([]);

  quizzes$: BehaviorSubject<any[]> = new BehaviorSubject(myQuizzes);

  createQuiz(form) {
    this.http.post<any>(
      `${this.url}/api/tests`, form)
      .subscribe(
        data => {
          console.log(data);
          this.flash.showSuccess(data.status);
        },
        error => {
          console.log(error);
          this.flash.showError(error.status);
        });
  }

  setInterval(speed: number){
    return interval(speed);
  }

  getUserQuizzes() {
    this.http.get<any>(
      `${this.url}/api/tests`)
      .subscribe(
        data => {
          console.log(data);
          this.myQuizzes.next(data.tests);
        },
        error => {
          console.log(error);
          this.flash.showError(error.status);
        });
  }

  getAllQuizzes() {
    this.http.get<any>(
      `${this.url}/api/tests/all`)
      .subscribe(
        data => {
          console.log(data);
          this.allQuizzes.next(data.tests);
        },
        error => {
          console.log(error);
          this.flash.showError(error.status);
        });
  }

  getMyQuizzesArray(): Observable<any> {
    return this.myQuizzes.asObservable();
  }

  getAllQuizzesArray(): Observable<any> {
    return this.allQuizzes.asObservable();
  }

}
