import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';


//Lena added
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { MyQuizzesComponent } from './components/my-quizzes/my-quizzes.component';
import { MyResultsComponent } from './components/my-results/my-results.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { MyQuizCardComponent } from './components/my-quiz-card/my-quiz-card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';

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
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
          return     localStorage.getItem('userAuthData'); },
        whitelistedDomains: [],
        blacklistedRoutes: [],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
