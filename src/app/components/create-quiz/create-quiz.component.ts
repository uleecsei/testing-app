import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { topics } from './topics';
import { QuestionsComponent } from '../questions/questions.component';
import Question from '../../services/questions/Question';
import { QuestionsService } from '../../services/questions/questions.service';
import { QuestionsEditComponent } from '../questions-edit/questions-edit.component';
import { QuizzesService } from '../../services/quizzes/quizzes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit, OnDestroy {
  createQuizForm1: FormGroup;
  createQuizForm2: FormGroup;
  topicOptions = topics;
  questions: Question[];

  componentDestroyed = new Subject();

  constructor(
    public dialog: MatDialog,
    private questionsService: QuestionsService,
    private quizzesService: QuizzesService,
    private router: Router,
  ) {
    this.questionsService.getQuestions()
      .pipe(
        takeUntil(this.componentDestroyed)
      )
      .subscribe(data => {
        this.questions = data;
      });
  }

  ngOnInit(): void {
    this.createQuizForm1 = new FormGroup({
      title: new FormControl(null, [Validators.required]),
    });

    this.createQuizForm2 = new FormGroup({
      topic: new FormControl(null, [Validators.required]),
    });
  }

  addQuestion() {
    this.dialog.open(QuestionsComponent);
  }

  delete(index) {
    this.questionsService.deleteQuestion(index);
  }

  edit(question, index) {
    this.dialog.open(QuestionsEditComponent, {
      data: {
        question,
        index
      }
    });
  }

  formsSubmit(){

    const form = {
      ...this.createQuizForm1.value,
      ...this.createQuizForm2.value,
      questions: this.questions,
    };
    this.quizzesService.createQuiz(form);
    this.questionsService.clearQuestions();
    this.router.navigate(['/home/myquizzes']);

  }

  ngOnDestroy(): void {
    this.questionsService.clearQuestions();
  }

}
