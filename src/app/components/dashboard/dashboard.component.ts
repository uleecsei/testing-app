import { Component, OnInit } from '@angular/core';

import { QuizzesService } from 'src/app/services/quizzes/quizzes.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  quizzes:any[]=[];

  constructor(private quizzesService:QuizzesService) { 
    this.quizzesService.quizzes$.subscribe(res=>{
      this.quizzes=res;
    })
  }

  ngOnInit(): void {

  }

}
