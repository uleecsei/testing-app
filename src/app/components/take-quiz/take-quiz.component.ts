import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';
import {UserAnswer } from '../../interfaces/quiz'
import { MatSnackBar } from '@angular/material/snack-bar';
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
  currentIndex:number=0;
  userAnswers:any=[];
  chosen;
  
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private quizzesService:QuizzesService,
    private snackBar:MatSnackBar
    ) {
   }

  ngOnInit(): void {
    
    this.routeSubscription = this.route.params.subscribe(params=>{
      this.id=params['id']
      console.log(this.id)
    });
    this.quizzesService.quizzes$.subscribe(res=>{
      console.log(res,this.id)
      this.quiz=res.filter(e=>e.id===+this.id)[0]
      this.questions=this.quiz.questions
      console.log(this.quiz.questions)
      this.currentQ=this.quiz.questions[0];
    })
  }
  // choose(event:any){
  //   this.chosen=event.target.to
  //   console.log(this.chosen)
  // }
  next(){
    this.openSnack()
    this.currentQ=this.questions[++this.currentIndex]
    console.log(this.chosen)
    
  }
  openSnack(){
    let snackBarRef = this.snackBar.open("message",null,{
      duration: 2000,
    })
    
  }

  

}
