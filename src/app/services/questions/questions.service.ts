import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions = new BehaviorSubject([]);

  constructor() { }

  createQuestion(form) {
    return {
      question: form.question,
        answers: [
      {
        text: form.answer1,
        isTrue: form.answer1Status,
      },
      {
        text: form.answer2,
        isTrue: form.answer2Status,
      },
      {
        text: form.answer3,
        isTrue: form.answer3Status,
      },
      {
        text: form.answer4,
        isTrue: form.answer4Status,
      }
    ]
    };
  }

  getQuestions(): Observable<any> {
    return this.questions.asObservable();
  }

  addQuestion(form) {
    this.questions.next([...this.questions.getValue(), this.createQuestion(form)]);
  }

  deleteQuestion(index) {
    const newArray = this.questions.getValue();
    newArray.splice(index, 1);
    this.questions.next(newArray);
  }

  editQuestion(index, form) {
    const newArray = this.questions.getValue();
    newArray[index] = this.createQuestion(form);
    this.questions.next(newArray);
  }

  clearQuestions() {
    this.questions.next([]);
  }
}
