import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumInsertPage } from './forum-insert.page';

describe('ForumInsertPage', () => {
  let component: ForumInsertPage;
  let fixture: ComponentFixture<ForumInsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumInsertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumInsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
