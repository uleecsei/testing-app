enum QuestionType{
   radio="radio",
   checkbox="checkbox"
}

interface UserAnswer{
    questionIndex:number;
    answer:any;
    
}
export {QuestionType,UserAnswer}