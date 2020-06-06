import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsService } from '../../services/questions/questions.service';
import { QuizzesService } from '../../services/quizzes/quizzes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsComponent } from '../questions/questions.component';
import { QuestionsEditComponent } from '../questions-edit/questions-edit.component';
import { topics } from '../create-quiz/topics';
import Question from '../../services/questions/Question';
import {takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit, OnDestroy {
  id: number;
  quiz;
  createQuizForm1: FormGroup;
  createQuizForm2: FormGroup;
  topicOptions = topics;
  questions: Question[];

  private routeSubscription: Subscription;
  componentDestroyed = new Subject();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private questionsService: QuestionsService,
    private quizzesService: QuizzesService,
    private router: Router,
    ) {
    this.routeSubscription = route.params.subscribe(params => {
      this.id = params.id;
    });

    this.quiz = window.history.state.quiz;

    this.questionsService.setQuestions(this.quiz.questions);

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
      title: new FormControl(this.quiz.title, [Validators.required]),
    });

    this.createQuizForm2 = new FormGroup({
      topic: new FormControl(this.quiz.topic, [Validators.required]),
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
    this.quizzesService.editQuiz(this.quiz._id, form);
    this.questionsService.clearQuestions();
    this.router.navigate(['/home/myquizzes']);

  }

  ngOnDestroy(): void {
    this.questionsService.clearQuestions();
  }

}
