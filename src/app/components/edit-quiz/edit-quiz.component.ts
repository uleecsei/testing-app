import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  id: number;
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute) {
    this.routeSubscription = route.params.subscribe(params=>{
      this.id=params['id']
      console.log(this.id)
    });
   }

  ngOnInit(): void {
    
  }

}
