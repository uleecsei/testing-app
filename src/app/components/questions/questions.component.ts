import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  addQuestion: FormGroup;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.addQuestion = new FormGroup({
      question: new FormControl(null, [Validators.required]),
      answer1: new FormControl(null, [Validators.required]),
      answer1Status: new FormControl(false, ),
      answer2: new FormControl(null, [Validators.required]),
      answer2Status: new FormControl(false, ),
      answer3: new FormControl(null, [Validators.required]),
      answer3Status: new FormControl(false, ),
      answer4: new FormControl(null, [Validators.required]),
      answer4Status: new FormControl(false, ),
    });
  }


  add() {
    this.questionsService.addQuestion(this.addQuestion.value);
  }

}
