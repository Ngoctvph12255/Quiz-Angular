import { IQuiz } from './../../../shared/models/quiz';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from './../../../shared/services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-EditSubject',
  templateUrl: './EditSubject.component.html',
  styleUrls: ['./EditSubject.component.css'],
})
export class EditSubjectComponent implements OnInit {
  code: string = '';
  listOfQuiz: IQuiz[] = [];
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }
  constructor(private quizService: QuizService, private route: ActivatedRoute) {
    this.route.params.subscribe((parms: any) => {
      console.log(parms);
      this.code = parms['id'];
    });
  }

  ngOnInit() {
    this.quizService.list(this.code).subscribe((data) => {
      this.listOfQuiz = data;
    });
  }
  onRemove(id: string) {
    this.quizService.delete(this.code, id).subscribe((data) => {
      alert('Delete successfully!');
    });
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
