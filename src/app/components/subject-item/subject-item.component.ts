import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-item',
  templateUrl: './subject-item.component.html',
  styleUrls: ['./subject-item.component.css'],
})
export class SubjectItemComponent implements OnInit {
  @Input('data-search') subjectData: any;
  constructor() {}

  ngOnInit() {
  }
}
