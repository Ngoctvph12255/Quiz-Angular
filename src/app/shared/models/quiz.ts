export interface IQuiz {
  id: string;
  Text: string;
  Marks: number;
  AnswerId: number;
  Answers: [
    {
      id: number;
      Text: string;
    }
  ];
}
