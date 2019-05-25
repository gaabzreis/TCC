import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoInsertPage } from './resumo-insert.page';

describe('ResumoInsertPage', () => {
  let component: ResumoInsertPage;
  let fixture: ComponentFixture<ResumoInsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumoInsertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoInsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
