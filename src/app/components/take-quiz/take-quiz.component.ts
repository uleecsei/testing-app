import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';

import { UserAnswer } from '../../interfaces/quiz'
import { MatSnackBar } from '@angular/material/snack-bar';
import { logger } from 'codelyzer/util/logger';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';

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
  timeOut = false
  questionTimer: Subscription
  countdownTimer: Subscription
  gameStarted
  gameFinished
  timeLeft
  isSinglePlayer
  isCreator

  progressValue = 0;
  PROGRESS_BAR_SPEED = 150 // less = faster
  currentProgress: Subscription;

  private routeSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizzesService: QuizzesService,
    private answerService: AnswersService,
    private snackBar: MatSnackBar,
    private takequizService: TakeQuizService,
  ) {
  }


  ngOnInit(): void {
    // Лена, это обьект теста переданный при переходе, по идее теперь не надо искать его по айди

    this.quiz = window.history.state.quiz
    this.isSinglePlayer = window.history.state.isSinglePlayer || null
    this.isCreator = window.history.state.isCreator || null
    this.questionIndex = 0
    this.currentQuestion = this.quiz.questions[this.questionIndex]
    this.answerService.currentQuiz$.next(this.quiz)
    this.answerService.currentQuestion$.next(this.currentQuestion)
    this.takequizService.socket.on("startGame", () => {
      this.startGame()
    })

  }
  nextQuestion() {
    this.updateTimer()
    this.disableBtn()
    setTimeout(() => {
      this.saveUserAnswer()
      this.enableBtn()
      this.shouldUpdateProgressBar(this.currentProgress.closed)
      this.goToNextQuestion()
    }, 1500)
  }

  saveUserAnswer() {
    return this.answerService.saveAnswer(this.currentQuestion.qId)
  }

  disableBtn() {
    this.setIsAnswered()
    this.answerService.isAnswered$.next(this.isAnswered)
  }
  enableBtn = () => this.setIsAnswered()
  setIsAnswered = () => this.isAnswered = !this.isAnswered

  updateTimer() {
    return (this.timeOut) ? true : this.unsubscribeTimer()
  }
  unsubscribeTimer() {
    this.questionTimer.unsubscribe()
    this.countdownTimer.unsubscribe()
  }
  goToNextQuestion() {
    return (this.isLastQuestion()) ? this.finishGame() : this.getNewQuestion()
  }

  getNewQuestion() {
    this.changeQuestion()
    this.startTimer()
  }

  changeQuestion() {
    this.currentQuestion = this.quiz.questions[++this.questionIndex]
    this.answerService.currentQuestion$.next(this.currentQuestion)
  }

  isLastQuestion = () => this.questionIndex == this.quiz.questions.length - 1

  updateUserAnswer() {
    this.answerService.userAnswers$.next([])
    this.answerService.currentAnswer$.next([])

  }
  startGame() {
    this.gameStarted = true
    this.startTimer()
  }

  startByCreator() {
    this.takequizService.startGame()
  }


  finishGame() {
    this.gameStarted = false
    this.gameFinished = true
    this.updateUserAnswer()
  }


  startTimer() {
    this.timeOut = false;
    this.currentProgress = this.reloadProgressBar()
    this.startCountdownTimer()
    this.questionTimer = this.answerService.setQuestionTimer(this.currentQuestion.time
    ).subscribe(() => {
      console.log('time stopped')
      this.timeOut = true;
      this.questionTimer.unsubscribe()
      this.nextQuestion()
    })
  }


  startCountdownTimer() {
    this.timeLeft = this.currentQuestion.time
    this.countdownTimer = this.answerService.setCountdownTimer(this.currentQuestion.time
    ).subscribe(() => {
      this.timeLeft = this.timeLeft - 1000
    })
  }
  shouldUpdateProgressBar(condition) {
    return (condition) ? true : this.updateProgressBar()
  }

  updateProgressBar() {
    this.currentProgress.unsubscribe();
    this.currentProgress = this.reloadProgressBar();
  }

  reloadProgressBar() {
    this.progressValue = 0;
    return this.quizzesService.setInterval(100).subscribe(() => {
      this.progressValue++;
      this.shouldUpdateProgressBar(!(this.progressValue >= 101))
    });
  }

  ngOnDestroy() {
    this.questionTimer.unsubscribe()
    //this.unsubscribeTimer()
    this.currentProgress.unsubscribe()
  }
  // openSnack() {
  //   let snackBarRef = this.snackBar.open("message", null, {
  //     duration: 2000,
  //   });
  //   return snackBarRef
  // }

}
