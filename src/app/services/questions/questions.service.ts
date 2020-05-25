import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questions = new BehaviorSubject([]);

  constructor() { }

  createQuestion(form, num) {
    const type = (num > 1) ? 'checkbox' : 'radio';
    return {
      question: form.question,
      type,
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

  addQuestion(form, num) {
    this.questions.next([...this.questions.getValue(), this.createQuestion(form, num)]);
  }

  deleteQuestion(index) {
    const newArray = this.questions.getValue();
    newArray.splice(index, 1);
    this.questions.next(newArray);
  }

  editQuestion(index, form, num) {
    const newArray = this.questions.getValue();
    newArray[index] = this.createQuestion(form, num);
    this.questions.next(newArray);
  }

  clearQuestions() {
    this.questions.next([]);
  }
}
