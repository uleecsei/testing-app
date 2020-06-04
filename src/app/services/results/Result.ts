export default interface Result {
  id?: number | string;
  title: string;
  userAnswers: UserAnswerResults[];
  totalScore: number;
  percentage?: number;
}

interface UserAnswerResults {
  answerId?: number | string;
  answerTitle: string;
  isCorrect: boolean;
}
