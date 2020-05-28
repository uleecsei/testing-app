import { Injectable } from '@angular/core';
import {  BehaviorSubject,Subject} from 'rxjs';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  currentQuiz$=new BehaviorSubject(null)
  currentQuestion$=new BehaviorSubject(null)
  userAnswers$:BehaviorSubject<any[]>=new BehaviorSubject([])
  currentAnswer$:BehaviorSubject<any[]>=new BehaviorSubject([])

  isAnswered$=new Subject();
 
  constructor() { }

  answer(answer){
    if(answer.type==="radio"){
      this.currentAnswer$.next([answer])
      console.log(this.currentAnswer$.value)
    } else if (answer.type==="checkbox"){
      let answers=this.currentAnswer$.value;
      
      if(answers.indexOf(answer)>-1){
        this.currentAnswer$.next(answers.filter(e=>e.index!==answer.index))
        console.log( "VALUE",this.currentAnswer$.value)
      } else{
        this.currentAnswer$.next([...this.currentAnswer$.value,answer])
        console.log( "VALUE",this.currentAnswer$.value)
      }
      
    }
  }

  saveAnswer(qId){
    this.userAnswers$.value.push({
      questionId:qId,
      answers:this.currentAnswer$.value
    })
    console.log(this.userAnswers$.value)
    this.currentAnswer$.next([])
  }

  setQuestionTimer(time){
    console.log(time)
    return interval(time)
  }
  setCountdownTimer(time){
    const timer$=timer(time+1000)
    return interval(1000).pipe(
      takeUntil(timer$)
    )
  }
  




}
