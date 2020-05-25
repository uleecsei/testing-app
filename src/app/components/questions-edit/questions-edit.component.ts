import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsService } from '../../services/questions/questions.service';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.scss']
})
export class QuestionsEditComponent implements OnInit {
  changeQuestion: FormGroup;
  checkboxes = [
    this.data.question.answers[0].isTrue,
    this.data.question.answers[1].isTrue,
    this.data.question.answers[2].isTrue,
    this.data.question.answers[3].isTrue
  ];
  counter = this.checkboxes.filter(i => i).length;

  constructor(
    private questionsService: QuestionsService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.changeQuestion = new FormGroup({
      question: new FormControl(this.data.question.question, [Validators.required]),
      answer1: new FormControl(this.data.question.answers[0].text, [Validators.required]),
      answer1Status: new FormControl(this.data.question.answers[0].isTrue, ),
      answer2: new FormControl(this.data.question.answers[1].text, [Validators.required]),
      answer2Status: new FormControl(this.data.question.answers[1].isTrue, ),
      answer3: new FormControl(this.data.question.answers[2].text, [Validators.required]),
      answer3Status: new FormControl(this.data.question.answers[2].isTrue, ),
      answer4: new FormControl(this.data.question.answers[3].text, [Validators.required]),
      answer4Status: new FormControl(this.data.question.answers[3].isTrue, ),
    });
  }

  checkCounter() {
    this.counter = this.checkboxes.filter(i => i).length;
    console.log(this.counter);
  }

  editQuestion() {
    this.questionsService.editQuestion(this.data.index, this.changeQuestion.value, this.counter);
    this.changeQuestion.reset();
  }
}
