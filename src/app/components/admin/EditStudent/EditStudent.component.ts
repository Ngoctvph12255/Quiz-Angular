import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';
import { IStudent } from './../../../shared/models/student';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { comparePasswordValidator } from 'src/app/helpers/validators/comparePassword';
import * as moment from 'moment';

@Component({
  selector: 'app-EditStudent',
  templateUrl: './EditStudent.component.html',
  styleUrls: ['./EditStudent.component.css'],
})
export class EditStudentComponent implements OnInit {
  studentForm: any;
  listOfStudent: IStudent = {};
  id: string = '';
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((parms) => {
      this.id = parms['id'];
    });
  }

  private initForm(): void {
    this.studentForm = this.formBuilder.group({
      fullname: [
        this.listOfStudent?.fullname || '',
        [Validators.required, Validators.minLength(5)],
      ],
      username: [this.listOfStudent?.username || '', [Validators.required]],
      password: [
        this.listOfStudent?.password || '',
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: ['', [Validators.required]],
      marks: [
        this.listOfStudent?.marks || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      schoolfee: [this.listOfStudent?.schoolfee || '', [Validators.required]],
      email: [this.listOfStudent?.email || '', [Validators.required]],
      birthday: [
        moment(this.listOfStudent?.birthday).format('yyyy-MM-DD') || '',
        [Validators.required],
      ],
      gender: [this.listOfStudent?.gender || 'false'],
    });
  }

  ngOnInit() {
    this.studentForm?.controls['confirmPassword'].valueChanges.subscribe(
      (data: any) => {
        this.studentForm?.controls['confirmPassword'].addValidators([
          comparePasswordValidator(
            this.studentForm?.controls['password'].value
          ),
        ]);
      }
    );
    this.studentService.findById(this.id).subscribe((data) => {
      this.listOfStudent = data;
      console.log('data:' + this.listOfStudent);
      this.initForm();
    });
    this.initForm();
  }
  submitForm() {
    delete this.studentForm?.value.confirmPassword;
    const student = { ...this.studentForm?.value };
    console.log(student);

    this.studentService.update(student, this.id).subscribe((rsp) => {
      alert('Update successfully!');
    });
  }
}
