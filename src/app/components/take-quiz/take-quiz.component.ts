import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';

import { UserAnswer } from '../../interfaces/quiz'
import { MatSnackBar } from '@angular/material/snack-bar';
import { logger } from 'codelyzer/util/logger';
import { AnswersService } from 'src/app/services/answers/answers.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {
  quiz
  questionIndex
  currentQuestion
  isAnswered;
  timeOut=false
  questionTimer:Subscription
  countdownTimer:Subscription
  gameStarted
  gameFinished
  questiontime
  timeLeft

  progressValue = 0;
  PROGRESS_BAR_SPEED = 150 // less = faster
  currentProgress: Subscription;

  private routeSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizzesService: QuizzesService,
    private answerService: AnswersService,
    private snackBar: MatSnackBar
  ) {
  }


  ngOnInit(): void {
    // Лена, это обьект теста переданный при переходе, по идее теперь не надо искать его по айди
    
    this.quiz=window.history.state.quiz
    this.questionIndex=0
    this.currentQuestion=this.quiz.questions[this.questionIndex]
    this.answerService.currentQuiz$.next(this.quiz)
    this.answerService.currentQuestion$.next(this.currentQuestion)
    
    // this.routeSubscription = this.route.params.subscribe(params => {
    //   this.id = params['id']
    //   console.log(this.id)
    // });
    // this.quizzesService.quizzes$.subscribe(res => {
    //   this.quiz = res.filter(e => e.id === +this.id)[0]
    //   this.questions = this.quiz.questions
    //   this.currentQ = this.quiz.questions[0];
    // })
    // this.answerService.timeOut$.subscribe(() => {
    //   this.next()
    // })
    
  }





  nextQuestion() {
    
    if(!this.timeOut){
      this.questionTimer.unsubscribe()
      this.countdownTimer.unsubscribe()
    }
    this.isAnswered = true
    this.answerService.isAnswered$.next(this.isAnswered)
    setTimeout(() => {
      this.answerService.saveAnswer(this.currentQuestion.qId)
      this.isAnswered = false
      if (!this.currentProgress.closed) {
        this.currentProgress.unsubscribe();
        this.currentProgress = this.reloadProgressBar();
      }
      if (!(this.questionIndex == this.quiz.questions.length - 1)) {
        this.changeQuestion()
        this.startTimer()
      } else {
        this.finishGame()
      }
    }, 1500)
  }
  changeQuestion() {
    this.currentQuestion=this.quiz.questions[++this.questionIndex]
    this.answerService.currentQuestion$.next(this.currentQuestion)
    
    this.gameStarted = false
    this.gameFinished = true
    this.answerService.userAnswers$.next([])
    this.answerService.currentAnswer$.next([])
  }
  // openSnack() {
  //   let snackBarRef = this.snackBar.open("message", null, {
  //     duration: 2000,
  //   });
  //   return snackBarRef
  // }

  startGame = () => {
    this.gameStarted=true
    this.startTimer()
  }
  finishGame() {
    this.gameStarted = false
    this.gameFinished=true
    this.answerService.userAnswers$.next([])
    this.answerService.currentAnswer$.next([])
  }
  startTimer(){
    this.timeOut=false;
    this.currentProgress = this.reloadProgressBar()
    this.startCountdownTimer()
    this.questionTimer=this.answerService.setQuestionTimer(this.currentQuestion.time
      ).subscribe(()=>
    {
      console.log('time stopped')
      this.timeOut=true;
      this.questionTimer.unsubscribe()
      this.nextQuestion()
    })
  }

  
  startCountdownTimer(){
    this.timeLeft=this.currentQuestion.time
    this.countdownTimer=this.answerService.setCountdownTimer(this.currentQuestion.time
      ).subscribe(()=>{
      this.timeLeft=this.timeLeft-1000
    })}

  reloadProgressBar() {
    this.progressValue = 0;
    return this.quizzesService.setInterval(100).subscribe(() => {
      this.progressValue++;
      if (this.progressValue >= 101) {
        this.currentProgress.unsubscribe();
        
        this.currentProgress = this.reloadProgressBar();
      }
    });
  }

  ngOnDestroy(){
    this.questionTimer.unsubscribe()
    this.currentProgress.unsubscribe()
  }


}
