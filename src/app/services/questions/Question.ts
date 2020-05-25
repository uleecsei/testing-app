export default interface Question {
  question: string;
  answers: [
    {
      text: string,
      isTrue: boolean,
    },
    {
      text: string,
      isTrue: boolean,
    },
    {
      text: string,
      isTrue: boolean,
    },
    {
      text: string,
      isTrue: boolean,
    }
    ];
}
