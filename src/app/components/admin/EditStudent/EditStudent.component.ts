import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';
import { IStudent } from './../../../shared/models/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { comparePasswordValidator } from 'src/app/helpers/validators/comparePassword';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-EditStudent',
  templateUrl: './EditStudent.component.html',
  styleUrls: ['./EditStudent.component.css'],
})
export class EditStudentComponent implements OnInit {
  studentForm: any;
  listOfStudent: any = {};
  id: string = '';
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((parms) => {
      this.id = parms['id'];
    });
  }

  private initForm(): void {
    this.studentForm = this.formBuilder.group({
      name: [
        this.listOfStudent?.name || '',
        [Validators.required, Validators.minLength(5)],
      ],
      firstName: [this.listOfStudent?.firstName || '', [Validators.required]],
      email: [
        { value: this.listOfStudent?.email || '', disabled: true },
        [Validators.required],
      ],
      avatar: [this.listOfStudent?.avatar || '', [Validators.required]],
      gender: [this.listOfStudent?.gender || false, [Validators.required]],
      googleId: [
        { value: this.listOfStudent?.googleId || '', disabled: true },
        [Validators.required],
      ],
      // birthday: [
      //   moment(this.listOfStudent?.birthday).format('yyyy-MM-DD') || '',
      //   [Validators.required],
      // ],
      // gender: [this.listOfStudent?.gender || 'false'],
      marks: [
        this.listOfStudent?.marks || '',
        [Validators.required, Validators.maxLength(100)],
      ],
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
    if (this.studentForm.invalid) {
      this.toastr.error('form điền vào không hợp lệ');
      return;
    }
    this.studentService.update(student, this.id).subscribe((rsp) => {
      this.toastr.success('Updated successfully !!', 'NgocTV.com');
    });
  }
}
