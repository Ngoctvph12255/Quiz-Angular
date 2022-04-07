import { StudentService } from 'src/app/shared/services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private studentService: StudentService) { }

  ngOnInit() {
     this.route.params.subscribe((pam) => {
       this.studentService.findById((pam['idStudent'])).subscribe((stu) => {
         let subject_code = pam['code'];
         console.log(stu.marks[subject_code]);
       });
     });
  }

}
