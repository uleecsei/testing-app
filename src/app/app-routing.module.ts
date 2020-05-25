import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { MyQuizzesComponent } from './components/my-quizzes/my-quizzes.component';
import { MyResultsComponent } from './components/my-results/my-results.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditQuizComponent } from './components/edit-quiz/edit-quiz.component';
import { TakeQuizComponent } from './components/take-quiz/take-quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [{
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: 'myquizzes',
      component: MyQuizzesComponent,
    }, {
      path: 'myresults',
      component: MyResultsComponent,
    },
      {
        path: 'createQuiz',
        component: CreateQuizComponent,
      },
      {
        path: 'editQuiz/:id',
        component: EditQuizComponent,
      },
      {
        path: 'takeQuiz/:id',
        component: TakeQuizComponent,
      }, ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
