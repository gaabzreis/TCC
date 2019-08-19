import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanHomePage } from './kanban-home.page';

describe('KanbanHomePage', () => {
  let component: KanbanHomePage;
  let fixture: ComponentFixture<KanbanHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
