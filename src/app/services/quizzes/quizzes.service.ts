import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../messages/messages.service';
import { BehaviorSubject, interval } from 'rxjs';


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

  }
  url = environment.baseUrl;
  allQuizzes = new BehaviorSubject([]);
  myQuizzes = new BehaviorSubject([]);

  createQuiz(form) {
    console.log(form);
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

  editQuiz(id, form) {
    this.http.put<any>(
      `${this.url}/api/tests/${id}`, form)
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

  deleteQuiz(id) {
    this.http.delete<any>(
      `${this.url}/api/tests/${id}`)
      .subscribe(
        data => {
          console.log(data);
          this.flash.showSuccess(data.status);
        },
        error => {
          console.log(error);
          this.flash.showError(error.status);
        });

    this.myQuizzes.next(this.myQuizzes.getValue().filter(i => i._id !== id));
  }

  setInterval(speed: number){
    return interval(speed);
  }

  getUserQuizzes() {
    this.http.get<any>(
      `${this.url}/api/tests`)
      .subscribe(
        data => {
          this.myQuizzes.next(data.tests);
        },
        error => {
          this.flash.showError(error.status);
        });
  }

  getAllQuizzes() {
    this.http.get<any>(
      `${this.url}/api/tests/all`)
      .subscribe(
        data => {
          this.allQuizzes.next(data.tests);
        },
        error => {
          this.flash.showError(error.status);
        });
  }

  getMyQuizzesArray(): Observable<any> {
    this.getUserQuizzes();
    return this.myQuizzes.asObservable();
  }

  getAllQuizzesArray(): Observable<any> {
    this.getAllQuizzes();
    return this.allQuizzes.asObservable();
  }

}
