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
  maxScore: number
  isAnswered$ = new Subject();

  constructor() {}

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
  saveAnswer() {
    let userAnswer = {
      answers: this.currentAnswer$.value
    }
    this.userAnswers$.next([...this.userAnswers$.value, userAnswer])
    console.log(this.userAnswers$.value)
    this.currentAnswer$.next([])
  }

  getResult(maxScore, quizTitle) {
    const answers = this.getAnswers();
    const { correct, incorrect } = this.getCorrectNumber(answers)
    const score = this.calculateScore(answers)

    const percentage = Math.round(score / maxScore);
    return {
      quizTitle,
      score,
      correct,
      incorrect,
      percentage
    }
  }
  getAnswers() {
    let questions = this.userAnswers$.value
    let allAnswers = []
    questions.forEach(q => {
      allAnswers = [...allAnswers, ...q.answers]
    })
    return allAnswers
  }

  calculateScore(answers) {
    let score: number = 0;

    answers.forEach(answer => {
      if (answer.answer.isTrue && answer.type == "radio") {
        score += 100
      } else if (!answer.answer.isTrue && answer.type == "checkbox") {
        score -= 50
      } else if (answer.answer.isTrue && answer.type == "checkbox") {
        score += 50
      } else {
        return
      }
    })
    return score
  }

  getCorrectNumber(answers) {
    let correct = 0;
    let incorrect = 0;
    answers.forEach(a => {
      if (a.answer.isTrue) {
        correct++;
      } else { incorrect++; }
    })

    return { correct, incorrect }
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



