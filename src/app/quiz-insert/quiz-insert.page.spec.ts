import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInsertPage } from './quiz-insert.page';

describe('QuizInsertPage', () => {
  let component: QuizInsertPage;
  let fixture: ComponentFixture<QuizInsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizInsertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
