import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/shared/services/student.service';
import { IStudent } from './../../../shared/models/student';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { comparePasswordValidator } from 'src/app/helpers/validators/comparePassword';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-EditStudent',
  templateUrl: './EditStudent.component.html',
  styleUrls: ['./EditStudent.component.css'],
})
export class EditStudentComponent implements OnInit {
  uploadFile: string = '';
  private basePath = '/uploads';
  studentForm: any;
  listOfStudent: any = {};
  id: string = '';
  constructor(
    private fireStorage: AngularFireStorage,
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
      name: [this.listOfStudent?.name || '', [Validators.required]],
      firstName: [this.listOfStudent?.firstName || '', [Validators.required]],
      email: [
        { value: this.listOfStudent?.email || '', disabled: false },
        [Validators.required],
      ],
      avatar: [this.listOfStudent?.avatar || ''],
      gender: [this.listOfStudent?.gender || false],
      googleId: [
        { value: this.listOfStudent?.googleId || '', disabled: false },
        [Validators.required],
      ],
      marks: [this.listOfStudent?.marks || 0],
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
    this.studentForm.controls['avatar'].setValue(this.uploadFile);
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
  chooseFile(event: any) {
    let file = event.target.files[0];
    const filePath = `${this.basePath}/${file.name}`;
    const storageRef = this.fireStorage.ref(filePath);
    this.fireStorage
      .upload(filePath, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            console.log(downloadURL);
            this.uploadFile = downloadURL;
          });
        })
      )
      .subscribe();
  }
}
