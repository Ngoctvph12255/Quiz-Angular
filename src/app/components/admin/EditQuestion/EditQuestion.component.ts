import { IQuiz } from './../../../shared/models/quiz';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { comparePasswordValidator } from 'src/app/helpers/validators/comparePassword';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-EditQuestion',
  templateUrl: './EditQuestion.component.html',
  styleUrls: ['./EditQuestion.component.css'],
})
export class EditQuestionComponent implements OnInit {
  uploadFile: string = '';
  private basePath = '/uploads';
  questionForm: any;
  // listOfQuestion: Array<any> = {
  //   id: '',
  //   Text: '',
  //   Marks: 0,
  //   AnswerId: 0,
  //   Answers: [
  //     {
  //       id: '',
  //     Text: ''
  //     }
  //   ]
  // };
  id: string = '';
  code = '';
  constructor(
    private fireStorage: AngularFireStorage,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private routerRedirect: Router
  ) {
    this.route.params.subscribe((parms) => {
      this.id = parms['id'];
      this.code = parms['code'];
      
    });
  }

  private initForm(): void {
    // this.questionForm = this.formBuilder.group({
    //   Text: [this.listOfQuestion?.Text || '', [Validators.required]],
    //   AnswerId: [this.listOfQuestion?.AnswerId || '', [Validators.required]],
    //   Marks: [this.listOfQuestion?.Marks || '', [Validators.required]],
    //   Answer: FormArray [
    //      { id: '';
    //         Text: ''
    //       }
    //   ]
       
    // });
  }

  ngOnInit() {
    this.initForm();
  }
  submitForm() {
    const question = { ...this.questionForm?.value };
    if (this.questionForm.invalid) {
      this.toastr.error('form điền vào không hợp lệ');
      return;
    }
    this.quizService.update(this.code, this.id, question ).subscribe((rsp) => {
      this.toastr.success('Updated successfully !!', 'NgocTV.com');
      this.routerRedirect.navigate(['/admin/mon-hoc/edit/'+ this.code]);
    });
  }
}
