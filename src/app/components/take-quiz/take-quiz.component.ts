import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Subject} from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import { UserAnswer } from '../../interfaces/quiz'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnswersService } from 'src/app/services/answers/answers.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.scss']
})
export class TakeQuizComponent implements OnInit {

  id: number;
  quiz;
  questions;
  currentQ;
  currentIndex: number = 0;
  questionChanged$=new Subject();
 
  submitted;
  gameStarted;
  gameFinished


  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private quizzesService: QuizzesService,
    private snackBar: MatSnackBar,
    private answerService: AnswersService
  ) {
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.id = params['id']
      console.log(this.id)
    });
    this.quizzesService.quizzes$.subscribe(res => {
      this.quiz = res.filter(e => e.id === +this.id)[0]
      this.questions = this.quiz.questions
      this.currentQ = this.quiz.questions[0];
    })
    this.answerService.timeOut$.subscribe(()=>{
      this.next()
    })
    
  }

  next() {
    this.submitted = true
    this.answerService.goToNext$.next(true)
    //this.openSnack()
    setTimeout(() => {
      this.answerService.next(this.currentQ.qId)
      this.submitted = false
      
      if (!(this.currentIndex == this.questions.length - 1)) {
        this.changeQuestion()
      } else {
        this.finishGame()
      }
    }, 1500)
  }

  changeQuestion() {
    this.currentQ = this.questions[++this.currentIndex]
    this.answerService.questionChanged$.next()
  }
  // openSnack() {
  //   let snackBarRef = this.snackBar.open("message", null, {
  //     duration: 2000,
  //   })
  //   return snackBarRef

  // }
  startGame = () => {
  this.gameStarted = true
  this.answerService.questionChanged$.next()
  }
  finishGame() {
    
    this.gameStarted = false
    this.gameFinished = true
    this.answerService.userAnswers$.next([])
    this.answerService.currentAnswer$.next([])
  }



}
