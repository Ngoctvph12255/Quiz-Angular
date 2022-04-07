import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  student: number = 1200;
  subject: number = 34;
  constructor() {}

  ngOnInit() {}
}
