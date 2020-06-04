export default interface Question {
  question: string;
  type: string;
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
