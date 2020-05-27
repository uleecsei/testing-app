import { Component, OnInit ,Input} from '@angular/core';
import { Subscription, from, interval } from 'rxjs';
import { AnswersService } from 'src/app/services/answers/answers.service';
@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() currentQ;
  timer$ 
  
  subscription
  constructor(private answerService: AnswersService) { }

  ngOnInit(): void {
    console.log('started')
    this.timer$=interval(this.currentQ.time);
    this.startTime()
    this.answerService.goToNext$.subscribe(()=>{
      this.timer$.unsubscribe()
    })
    this.answerService.questionChanged$.subscribe(()=>{
      
       console.log('started')
       this.timer$=interval(this.currentQ.time);
       this.startTime()
    })
    
  }
  startTime(){
  this.subscription = this.timer$.subscribe((val) => {
      console.log(`${this.currentQ.time/1000} seconds has passed`)
      this.subscription.unsubscribe()
    })
  }

  ngOnDestroy(){
    this.timer$.unsubscribe()
    console.log("destroy")
  }

 

}
