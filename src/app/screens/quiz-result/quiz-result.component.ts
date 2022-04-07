import { StudentService } from 'src/app/shared/services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css'],
})
export class QuizResultComponent implements OnInit {
  infoStudent: any;
  subject_code: any;
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((pam) => {
      console.log(pam['idStudent']);
      this.studentService.findById(pam['idStudent']).subscribe((stu) => {
         this.subject_code = pam['id'];
        this.infoStudent = stu
        console.log(this.infoStudent.marks[this.subject_code]);
        
        //.marks[subject_code]
      });
    });
  }
}
