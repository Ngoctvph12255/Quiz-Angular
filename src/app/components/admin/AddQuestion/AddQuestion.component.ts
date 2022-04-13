import { QuizService } from './../../../shared/services/quiz.service';
import { SubjectService } from './../../../shared/services/subject.service';
import { IQuiz } from './../../../shared/models/quiz';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-AddQuestion',
  templateUrl: './AddQuestion.component.html',
  styleUrls: ['./AddQuestion.component.css'],
})
export class AddQuestionComponent implements OnInit {
  ansId = 0;
  code = '';
  form: FormGroup;
  question: IQuiz = {
    id: '',
    Text: '',
    Marks: 1,
    AnswerId: 0,
    Answers: [
      {
        id: 0,
        Text: '',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((parms: any) => {
      this.code = parms['id'];
    });

    this.form = this.fb.group({
      Text: [this.question.Text || '', Validators.required],
      Marks: [this.question.Marks || '', Validators.required],
      AnswerId: [this.question.AnswerId || '', Validators.required],
      questions: this.fb.array([]),
    });
  }

  ngOnInit() {}
  addCreds() {
    const creds = this.form.controls['questions'] as FormArray;
    creds.push(
      this.fb.group({
        id: new FormControl(this.getRandomId()),
        Text: new FormControl(this.question.Text, [Validators.required]),
      })
    );
  }

  onSubmit() {
    this.form.controls['AnswerId'].setValue(this.ansId);
    const question = {
      ...this.form.value,
    };
    console.log(question);
    if (this.form.invalid) {
      this.toastr.error('Form invalid !!', 'NgocTV.com');
      return;
    }
    this.quizService.addNew(this.code, question).subscribe((resp) => {
      this.toastr.success('Created successfully !!', 'NgocTV.com');
    });
  }
  getRandomId(): number {
    return Math.floor(Math.random() * 6000 + 1);
  }
  chooseAnswerId(e: number) {
    console.log(e);
    this.ansId = e;
  }
}
