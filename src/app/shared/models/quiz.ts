export interface IQuiz {
  Id: string;
  Text: string;
  Marks: number;
  AnswerId: number;
  Answers: [
    {
      Id: number;
      Text: string;
    }
  ];
}
