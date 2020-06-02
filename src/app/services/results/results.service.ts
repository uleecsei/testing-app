import { Injectable } from '@angular/core';
import Result from './Result';

const hardCodedResults: Result[] = [
  {
    id: 1,
    title: 'Some Quiz',
    userAnswers: [
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: true,
      },
      {
        answerId: 2,
        answerTitle: 'The title',
        isCorrect: true,
      },
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: true,
      },
    ],
    totalScore: 1200,
  },
  {
    id: 2,
    title: 'Some Other Quiz',
    userAnswers: [
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: true,
      },
      {
        answerId: 2,
        answerTitle: 'The title',
        isCorrect: true,
      },
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: false,
      },
    ],
    totalScore: 400,
  },
  {
    id: 3,
    title: 'Different quiz',
    userAnswers: [
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: true,
      },
      {
        answerId: 2,
        answerTitle: 'The title',
        isCorrect: false,
      },
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: false,
      },
      {
        answerId: 2,
        answerTitle: 'The title',
        isCorrect: false,
      },
      {
        answerId: 1,
        answerTitle: 'The title',
        isCorrect: false,
      },
    ],
    totalScore: 100,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  getResults(): Result[] {
    return hardCodedResults;
  }
  countPercentage(resultsList: Result[]): Result[]{
    resultsList.map((item) => {
      const total = item.userAnswers.length;
      const areCorrect = item.userAnswers.filter(i => i.isCorrect).length;
      item.percentage = Math.floor(areCorrect * 100 / total);
    })
    return resultsList;
  }
}
