import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/services/student.service';
import { ToastrService } from 'ngx-toastr';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-Student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
})
export class StudentComponent implements OnInit {
  listOfStudent: Array<any> = [];
  confirmModal?: NzModalRef;
  isVisible = false;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.onGet();
  }
  onGet() {
    this.studentService.getAll().subscribe((data) => {
      this.listOfStudent = data;
      console.log(this.listOfStudent);
    });
  }
  onRemove(student: any) {
    this.onShowConfirm(student);
  }
  onShowConfirm(student: any) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to delete ' + student.name + '?',
      nzOnOk: () =>
        this.studentService.remove(student.id).subscribe((data) => {
          this.toastr.success('Delete it successfully !!', 'NgocTV.com'),
            console.log(data);
          this.onGet();
        }),
    });
  }
  onUpdate(id: string) {
    this.router.navigate(['/admin/sinh-vien/edit/' + id]);
  }
}
