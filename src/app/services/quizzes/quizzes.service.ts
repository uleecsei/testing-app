import { Injectable } from '@angular/core';
import { Topics } from 'src/app/components/create-quiz/topics';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
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
        qId: 1,
        type: QuestionType.radio,
        question: 'Are u ok?',
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
      }
    ]
  }
  ];

@Injectable({
  providedIn: 'root'
})

export class QuizzesService {

  constructor(
    private http: HttpClient,
    private flash: MessagesService,
    private userService: UserService
  ) {
    this.getUserQuizzes();
    this.getAllQuizzes();
    console.log(this.allQuizzes.value);
    console.log(this.myQuizzes.value);
    this.token = userService.getToken();
  }
  url = environment.baseUrl;
  token;
  allQuizzes = new BehaviorSubject([]);
  myQuizzes = new BehaviorSubject([]);

  quizzes$: BehaviorSubject<any[]> = new BehaviorSubject(myQuizzes);

  createQuiz(form) {
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.post<any>(
      `${this.url}/api/tests`, form, {headers: myHeaders})
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
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any>(
      `${this.url}/api/tests`, {headers: myHeaders})
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
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    this.http.get<any>(
      `${this.url}/api/tests/all`, {headers: myHeaders})
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
