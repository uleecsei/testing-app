import { Component, OnInit, Input } from '@angular/core';
import Result from 'src/app/services/results/Result';

@Component({
  selector: 'app-my-results-card',
  templateUrl: './my-results-card.component.html',
  styleUrls: ['./my-results-card.component.scss']
})
export class MyResultsCardComponent implements OnInit {
  @Input() resultCard: Result;
  leftIdent: string;
  spinColor: string;

  constructor() { }

  ngOnInit(): void {
    this.setIdent();
    this.setSpinColor();
  }
  
  setIdent() {
    if(this.resultCard.percentage < 10){
      this.leftIdent = "left:49px;";
    }else if(this.resultCard.percentage >= 10 && this.resultCard.percentage < 100){
      this.leftIdent = "left:45px;"
    }else {
      this.leftIdent = "left:37px"
    }
  }
  setSpinColor() {
    if(this.resultCard.percentage < 50){
      this.spinColor = "warn";
    }else {
      this.spinColor = "accent";
    }
  }
}
