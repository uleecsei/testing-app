import { Injectable } from '@angular/core';
import { Topics } from 'src/app/components/create-quiz/topics';
const myQuizzes= [
  {
    id:1,
    title:"Noun",
    topic:Topics.Languages,
    questions:[]
  }
]
@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  quizzes= myQuizzes;
  constructor() { }
}
