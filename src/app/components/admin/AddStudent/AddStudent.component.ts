import { StudentService } from 'src/app/shared/services/student.service';
import { IStudent } from './../../../shared/models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-AddStudent',
  templateUrl: './AddStudent.component.html',
  styleUrls: ['./AddStudent.component.css'],
})
export class AddStudentComponent implements OnInit {
  uploadFile: string = '';
  private basePath = '/uploads';
  listOfStudent?: IStudent = {};
  id: string = '';
  constructor(
    private fireStorage: AngularFireStorage,
    private studentService: StudentService,
    private toastr: ToastrService
  ) {}

  studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    googleId: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(6),
    // ]),
    // confirmPassword: new FormControl('', Validators.required),
    gender: new FormControl(true, [Validators.required]),
    // marks: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    // this.studentForm.controls['confirmPassword'].valueChanges.subscribe(
    //   (data) => {
    //     this.studentForm.controls['confirmPassword'].addValidators([
    //       comparePasswordValidator(this.studentForm.controls['password'].value),
    //     ]);
    //   }
    // );
  }
  submitForm() {
    this.studentForm.controls['avatar'].setValue(this.uploadFile);
    delete this.studentForm.value.confirmPassword;
    const student = { ...this.studentForm.value };
    if (this.studentForm.invalid) {
      this.toastr.error('form điền vào không hợp lệ');
      return;
    }
    console.log(student);

    this.studentService.addNew(student).subscribe((rsp) => {
      this.toastr.success('Added successfully !!', 'NgocTV.com');
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
