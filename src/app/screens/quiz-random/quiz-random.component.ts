import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ISubjects } from "src/app/shared/models/subjects";
import { QuizService } from "src/app/shared/services/quiz.service";
import { StudentService } from "src/app/shared/services/student.service";
import { SubjectService } from "src/app/shared/services/subject.service";

@Component({
  selector: 'app-quiz-random',
  templateUrl: './quiz-random.component.html',
  styleUrls: ['./quiz-random.component.css'],
})
export class QuizRandomComponent implements OnInit {
  questions: Array<any> = [];
  subject_code: string = '';
  user_answer: Array<any> = [];
  students: Array<any> = [];
  working_student: any;
  disabledSubmit = true;
  infoSubject: ISubjects = {
    Code: '',
    Logo: '',
    Name: '',
    id: 0
  };
  constructor(
    private questionService: QuizService,
    private studentService: StudentService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((pam) => {
      this.subject_code = pam['code'];
      this.getQuestion(this.subject_code);
    });
  }

  ngOnInit() {
    this.getStudents();
    this.getInfoQuiz();
  }
  getStudents() {
    this.studentService.list().subscribe((lstStudent) => {
      this.students = lstStudent;
    });
  }
  getQuestion(code: string) {
    this.questionService.list(code).subscribe((lstQuestion) => {
      let randArr = this.getDistinctNumberArray(10, lstQuestion.length);
      this.questions = lstQuestion.filter((el: any, ind: number) => {
        if (randArr.includes(ind)) {
          return true;
        }

        return false;
      });
    });
  }
  private getDistinctNumberArray(amount: number, max: number): Array<any> {
    let arr: Array<any> = [];
    while (arr.length < amount) {
      let randomNumber = Math.floor(Math.random() * max);
      if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      }
    }
    return arr;
  }
  choose(qid: number, aid: number): void {
    if (this.subject_code) this.disabledSubmit = false;
    let existed = -1;
    this.user_answer.forEach((el: any, index: number) => {
      if (el.qid == qid) {
        existed = index;
      }
    });

    if (existed == -1) {
      this.user_answer.push({
        qid: qid,
        aid: aid,
      });
    } else {
      this.user_answer[existed].aid = aid;
    }
  }
  submit() {
    let correctAnswers = 0;
    this.user_answer.forEach((ans: any) => {
      let question = this.questions.find((item: any) => item.id == ans.qid);
      if (question.AnswerId == ans.aid) {
        correctAnswers++;
      }
    });
    const score = (correctAnswers * 10) / this.questions.length;
    // tìm student dựa vào id
    const a = JSON.parse(`${localStorage.getItem('login_user')}`);
    
    this.studentService.findById(a.id).subscribe((stu: any) => {
      stu.marks[this.subject_code] = score.toFixed(2);
      this.studentService.update(stu, stu.id).subscribe((data) => {
        this.router.navigate(['/quiz-result', data.id, this.subject_code]);
      });
    });
  }
  getInfoQuiz() {
    this.subjectService.finByCode(this.subject_code).subscribe((data) => {
      this.infoSubject = data;
    });
  }
}
