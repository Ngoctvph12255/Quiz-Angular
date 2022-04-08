import { HomeLayoutComponent } from './../../layouts/home-layout/home-layout.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SubjectService } from '../../shared/services/subject.service';
import { StudentService } from '../../shared/services/student.service';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { ISubjects } from 'src/app/shared/models/subjects';
import { NodeService } from 'src/app/shared/services/node.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  loggedInUser: any = '';
  listSubjects: ISubjects[] = [];
  keyword = '';

  @Input('keyword-search') searchData: any;
  node: any;
  constructor(
    private subjectService: SubjectService,
    private studentService: StudentService,
    private authService: AuthService,
    private nodeService: NodeService
  ) {
    this.getSubject();
  }

  ngOnInit() {
    // this.nodeService.node$.subscribe((n: any) => (this.node = n));


    this.authService.logInUser.subscribe((user) => {
      console.log('Home login', user);
      if (user.email != undefined && user.googleId != undefined) {
        this.isLoggedIn = true;
        this.loggedInUser = user;
      }
    });
    this.getSubject();
  }
  ngAfterViewInit() {}
  getSubject(keyword: string = '') {
    this.subjectService
      .list(keyword)
      .pipe(map((response) => response.slice(0, 100)))
      .subscribe((data) => {
        this.listSubjects = data;
        // console.log(this.listSubjects);
      });
  }
  getStudent(keyword: string = '') {
    this.studentService.list(keyword).subscribe((data) => {
      console.log(data);
    });
  }
  search() {
    this.getSubject(this.keyword);
  }
  searchAnother() {
    this.keyword = this.searchData;
    console.log('key: ', this.keyword);
  }
}
