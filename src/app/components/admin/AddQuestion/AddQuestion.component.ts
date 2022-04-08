import { IQuiz } from './../../../shared/models/quiz';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AddQuestion',
  templateUrl: './AddQuestion.component.html',
  styleUrls: ['./AddQuestion.component.css'],
})
export class AddQuestionComponent implements OnInit {
  question: IQuiz = {
    id: '',
    Text: '',
    Marks: 0,
    AnswerId: 0,
    Answers: [
      {
        id: 0,
        Text: '',
      },
    ],
  };

  studentForm: FormGroup = new FormGroup({
    Text: new FormControl(this.question.Text, [Validators.required]),
    Marks: new FormControl(this.question.Marks),
    AnswerId: new FormControl(this.question.AnswerId),
    Answers1: new FormControl(this.question.Answers),
    Answers2: new FormControl(this.question.Answers),
    Answers3: new FormControl(this.question.Answers),
    Answers4: new FormControl(this.question.Answers),
  });
  constructor() {}

  ngOnInit() {}
}
