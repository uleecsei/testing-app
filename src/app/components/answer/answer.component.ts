import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
   @Input() index;
   @Input() answer;
   @Input() type;
   @Input() qId;
   @Input() chosen;
   chosenAnswer;
  constructor() { }

  ngOnInit(): void {
  }
  log(event){
    console.log(event.target)
    console.log(this)
    console.log({
      answer:this.index,
      isCorrect:this.answer.isCorrect,
      qId:this.qId
    })
    
  }

}
