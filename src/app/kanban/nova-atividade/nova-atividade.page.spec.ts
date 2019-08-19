import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaAtividadePage } from './nova-atividade.page';

describe('NovaAtividadePage', () => {
  let component: NovaAtividadePage;
  let fixture: ComponentFixture<NovaAtividadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaAtividadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaAtividadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
