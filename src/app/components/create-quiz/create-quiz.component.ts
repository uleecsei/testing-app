import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {topics} from './topics'

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  createQuizFrom: FormGroup;
  topicOptions=topics;
  selectedTopic;
  constructor() { }

  ngOnInit(): void {
    this.createQuizFrom = new FormGroup({
      id: new FormControl(1),
      title: new FormControl(null, [Validators.required]),
      topic: new FormControl(null, [Validators.required]),
      details: new FormControl('')
    });
  }
  onSubmit() {
    
    console.log(this.createQuizFrom.value);
   
  }

}
