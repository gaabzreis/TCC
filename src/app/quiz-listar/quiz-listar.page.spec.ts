import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListarPage } from './quiz-listar.page';

describe('QuizListarPage', () => {
  let component: QuizListarPage;
  let fixture: ComponentFixture<QuizListarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizListarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
