import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path:  'login',
    component: LoginComponent,
  },
  {
    path:  'registration',
    component: RegistrationComponent,
  },
  {
    path:  'home',
    component: HomeComponent,
  },
  {
    path:  '',
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
