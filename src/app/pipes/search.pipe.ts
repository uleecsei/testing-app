import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'quizzesSearch',
})
export class QuizSearchPipe implements PipeTransform {
  transform(qiuzzes: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return qiuzzes;
    }

    return qiuzzes.filter((quiz) => {
      return quiz.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
    });
  }
}
