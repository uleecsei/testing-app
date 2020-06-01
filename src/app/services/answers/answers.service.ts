import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  currentQuiz$ = new BehaviorSubject(null)
  currentQuestion$ = new BehaviorSubject(null)
  userAnswers$: BehaviorSubject<any[]> = new BehaviorSubject([])
  currentAnswer$: BehaviorSubject<any[]> = new BehaviorSubject([])

  isAnswered$ = new Subject();

  constructor() { }

  answer(answer) {
    if (answer.type === "radio") {
      this.addAnswer([answer])
    } else if (answer.type === "checkbox") {
      let answers = this.currentAnswer$.value;
      if (answers.includes(answer)) {
        this.addAnswer(answers.filter(e => e.index !== answer.index))
      } else {
        this.addAnswer([...this.currentAnswer$.value, answer])
      }

    }
  }
  addAnswer(answer) {
    this.currentAnswer$.next(answer)
    console.log("VALUE", this.currentAnswer$.value)
  }



  saveAnswer(qId) {
    let userAnswer = {
      questionId: qId,
      answers: this.currentAnswer$.value
    }
    this.userAnswers$.next([...this.userAnswers$.value, userAnswer])
    console.log(this.userAnswers$.value)
    this.currentAnswer$.next([])
  }

  setQuestionTimer(time) {
    console.log(time)
    return interval(time)
  }
  setCountdownTimer(time) {
    const timer$ = timer(time + 1000)
    return interval(1000).pipe(
      takeUntil(timer$)
    )
  }





}
