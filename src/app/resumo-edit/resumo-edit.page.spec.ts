import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoEditPage } from './resumo-edit.page';

describe('ResumoEditPage', () => {
  let component: ResumoEditPage;
  let fixture: ComponentFixture<ResumoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumoEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
