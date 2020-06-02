import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { MyQuizzesComponent } from './components/my-quizzes/my-quizzes.component';
import { MyResultsComponent } from './components/my-results/my-results.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { MyQuizCardComponent } from './components/my-quiz-card/my-quiz-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionsEditComponent } from './components/questions-edit/questions-edit.component';
import { AnswerComponent } from './components/answer/answer.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { QuizSearchPipe } from './pipes/search.pipe';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { MyResultsCardComponent } from './components/my-results-card/my-results-card.component';
import { RoomComponent } from './components/room/room.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CreateQuizComponent,
    MyQuizzesComponent,
    MyResultsComponent,
    QuizCardComponent,
    MyQuizCardComponent,
    DashboardComponent,
    EditQuizComponent,
    TakeQuizComponent,
    QuestionsComponent,
    QuestionsEditComponent,
    AnswerComponent,
    QuizSearchPipe,
    QuestionCardComponent,
    MyResultsCardComponent,
    QuestionCardComponent,
    RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return localStorage.getItem('userAuthData'); },
        whitelistedDomains: [],
        blacklistedRoutes: [],
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
