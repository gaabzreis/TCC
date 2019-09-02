import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumListPage } from './forum-list.page';

describe('ForumListPage', () => {
  let component: ForumListPage;
  let fixture: ComponentFixture<ForumListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
