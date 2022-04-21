import { SubjectService } from 'src/app/shared/services/subject.service';
import { StudentService } from 'src/app/shared/services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  student: number = 80;
  subject: number = 2;
  constructor(private studentService: StudentService, private subjectService: SubjectService) {}

  ngOnInit() {
    this.studentService.getAll().subscribe(data =>{
      console.log("length student" ,data.length);
      this.student = data.length;
      
    })
    this.subjectService.list().subscribe((data) => {
      console.log('length subject', data.length);
      this.subject = data.length;
    });
  }
}
