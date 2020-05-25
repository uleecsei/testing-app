enum QuestionType{
   radio="radio",
   checkbox="checkbox"
}

interface UserAnswer{
    questionIndex:number;
    answerIndex:number;
    isCorrect:boolean
}
export {QuestionType,UserAnswer}