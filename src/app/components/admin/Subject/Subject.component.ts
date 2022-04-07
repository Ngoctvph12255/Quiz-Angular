import { Router } from '@angular/router';
import { ISubjects } from './../../../shared/models/subjects';
import { SubjectService } from './../../../shared/services/subject.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Subject',
  templateUrl: './Subject.component.html',
  styleUrls: ['./Subject.component.css'],
})
export class SubjectComponent implements OnInit {
  listOfSubject: ISubjects[] = [];
  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit() {
    this.onInit();
  }
  onInit() {
    this.subjectService.list().subscribe((data) => {
      this.listOfSubject = data;
    });
  }
  onDetail(code: string){
    this.router.navigate(['/admin/mon-hoc/edit/'+code])
  }
}
