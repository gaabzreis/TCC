import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAtividadePage } from './detalhes-atividade.page';

describe('DetalhesAtividadePage', () => {
  let component: DetalhesAtividadePage;
  let fixture: ComponentFixture<DetalhesAtividadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesAtividadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAtividadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
