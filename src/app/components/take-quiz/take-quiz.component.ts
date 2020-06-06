import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import { UserService } from '../../services/user/user.service';
import { UserAnswer } from '../../interfaces/quiz';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logger } from 'codelyzer/util/logger';
import { AnswersService } from 'src/app/services/answers/answers.service';
import { TakeQuizService } from 'src/app/services/take-quiz/take-quiz.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  quiz;
  questionIndex;
  currentQuestion;
  isAnswered;
  timeOut = false;
  questionTimer: Subscription;
  countdownTimer: Subscription;
  gameStarted;
  gameFinished;
  timeLeft;
  isSinglePlayer;
  isCreator;
  progressValue = 0;
  PROGRESS_BAR_SPEED = 100; // less = faster
  currentProgress: Subscription;

  //new
  user
  displayedColumns: string[] = ['position', 'name', 'Total score', 'Correct answers', 'Wrong answers'];
  players = []
  allResults = []
  questionsNumber: number;
  maxScore: number;
  quizTitle: string;



  private routeSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizzesService: QuizzesService,
    private answerService: AnswersService,
    private snackBar: MatSnackBar,
    private takequizService: TakeQuizService,
    private userService: UserService
  ) {
    this.quiz = window.history.state.quiz;
    this.questionsNumber = this.quiz.questions.length
    this.quizTitle = this.quiz.title

    this.maxScore = getMaxScore(this.quiz)
    this.answerService.currentQuestion$.next(this.currentQuestion)
    console.log(this.quiz);
    this.user = this.userService.getUser()
    console.log(this.user)
    this.takequizService.socket.on("startGame", () => {
      this.startGame()
    })
    this.takequizService.players$.subscribe(players => {
      this.players = players
    })


  }


  ngOnInit(): void {
    // Лена, это обьект теста переданный при переходе, по идее теперь не надо искать его по айди

    this.isSinglePlayer = window.history.state.isSinglePlayer || null
    this.isCreator = window.history.state.isCreator || null
    this.questionIndex = 0
    this.currentQuestion = (this.quiz) ? this.quiz.questions[this.questionIndex] : null
    this.takequizService.allResults$.subscribe(res => {
      this.allResults = res;
      console.log(this.allResults)
    })


  }


  nextQuestion() {
    this.updateTimer()
    this.disableBtn()
    setTimeout(() => {
      this.saveUserAnswer();
      this.enableBtn();
      this.shouldUpdateProgressBar(this.currentProgress.closed);
      this.goToNextQuestion();
    }, 1000);
  }

  saveUserAnswer() {
    return this.answerService.saveAnswer()
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
    this.currentQuestion = this.quiz.questions[++this.questionIndex];
    this.answerService.currentQuestion$.next(this.currentQuestion);
  }

  isLastQuestion() {
    console.log(this.questionsNumber)
    return this.questionIndex == this.questionsNumber - 1
  }

  updateUserAnswer() {
    this.answerService.userAnswers$.next([]);
    this.answerService.currentAnswer$.next([]);

  }
  startGame() {
    this.gameStarted = true;
    this.startTimer();
  }

  startByCreator() {
    this.takequizService.startGame()
  }


  finishGame() {
    this.gameStarted = false;
    this.gameFinished = true;
    console.log("MAX SCORE", this.maxScore)
    let result = this.answerService.getResult(this.maxScore, this.quizTitle)
    let userId = this.user.userId;
    let userName = `${this.user.firstName} ${this.user.lastName}`
    this.saveRusults(result, userId, userName);
    this.updateUserAnswer()
    this.unsubscribeTimer()
  }

  saveRusults(result, userId, userName) {
    if (this.isSinglePlayer) {
      this.userService.setUserResults(result)
      this.takequizService.allResults$.next([{ ...result, userId, userName }])
      return;
    } else {
      this.takequizService.pushResults(result, userId, userName)
    }
  }


  startTimer() {
    this.timeOut = false;
    this.currentProgress = this.reloadProgressBar();
    this.startCountdownTimer();
    this.questionTimer = this.answerService.setQuestionTimer(10000
    ).subscribe(() => {
      console.log('time stopped');
      this.timeOut = true;
      this.questionTimer.unsubscribe();
      this.countdownTimer.unsubscribe();
      this.nextQuestion();

    });
  }


  startCountdownTimer() {
    this.timeLeft = 10000;
    this.countdownTimer = this.answerService.setCountdownTimer(10000
    ).subscribe(() => {
      this.timeLeft = this.timeLeft - 1000;
    });
  }
  shouldUpdateProgressBar(condition) {
    return (condition) ? true : this.updateProgressBar()
  }

  updateProgressBar() {
    this.currentProgress.unsubscribe();
    //this.currentProgress = this.reloadProgressBar();
  }

  reloadProgressBar() {
    this.progressValue = 0;
    return this.quizzesService.setInterval(100).subscribe(() => {
      this.progressValue++;
      this.shouldUpdateProgressBar(!(this.progressValue >= 101));
    });
  }

  ngOnDestroy() {
    if (this.questionTimer !== undefined
      && this.currentProgress !== undefined
      && this.countdownTimer !== undefined) {

      this.unsubscribeTimer();
      this.currentProgress.unsubscribe();
    } else {
      return;
    }
  }
  // openSnack() {
  //   let snackBarRef = this.snackBar.open("message", null, {
  //     duration: 2000,
  //   });
  //   return snackBarRef
  // }

}


function getMaxScore(quiz) {
  let maxScore = 0;

  quiz.questions.forEach(question => {
    question.answers.forEach(answer => {
      if (answer.isTrue) {
        if (question.type == "radio") {
          maxScore += 100
        } else {
          maxScore += 50
        }
      }
    })
  })

  return maxScore;
}