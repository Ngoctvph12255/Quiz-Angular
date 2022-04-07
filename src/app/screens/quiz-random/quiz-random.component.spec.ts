/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuizRandomComponent } from './quiz-random.component';

describe('QuizRandomComponent', () => {
  let component: QuizRandomComponent;
  let fixture: ComponentFixture<QuizRandomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRandomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
