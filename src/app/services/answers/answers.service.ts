import { Injectable } from '@angular/core';
import {  BehaviorSubject,Subject} from 'rxjs';
import { interval, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  userAnswers$:BehaviorSubject<any[]>=new BehaviorSubject([])
  currentAnswer$:BehaviorSubject<any[]>=new BehaviorSubject([])
  goToNext$=new Subject();
  timeOut$=new Subject();
  questionChanged$=new Subject();
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

  next(qId){
    this.userAnswers$.value.push({
      questionId:qId,
      answers:this.currentAnswer$.value
    })
    console.log(this.userAnswers$.value)
    this.currentAnswer$.next([])
  }
  




}
