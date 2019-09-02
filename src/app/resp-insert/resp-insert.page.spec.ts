import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespInsertPage } from './resp-insert.page';

describe('RespInsertPage', () => {
  let component: RespInsertPage;
  let fixture: ComponentFixture<RespInsertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespInsertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespInsertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
