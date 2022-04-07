import { StudentService } from 'src/app/shared/services/student.service';
import { IStudent } from './../../../shared/models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { comparePasswordValidator } from 'src/app/helpers/validators/comparePassword';

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css'],
})
export class AddStudentComponent implements OnInit {
  listOfStudent?: IStudent = {};
  id: string = '';
  constructor(private studentService: StudentService) {}

  studentForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    gender: new FormControl(true, [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    schoolfee: new FormControl('', Validators.required),
    marks: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    this.studentForm.controls['confirmPassword'].valueChanges.subscribe(
      (data) => {
        this.studentForm.controls['confirmPassword'].addValidators([
          comparePasswordValidator(this.studentForm.controls['password'].value),
        ]);
      }
    );
  }
  submitForm() {
    delete this.studentForm.value.confirmPassword;
    const student = { ...this.studentForm.value };
    console.log(student);

    this.studentService.addNew(student).subscribe((rsp) => {
      alert('Add successfully!');
    });
  }
}
