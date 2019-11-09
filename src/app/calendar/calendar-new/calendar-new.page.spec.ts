import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNewPage } from './calendar-new.page';

describe('CalendarNewPage', () => {
  let component: CalendarNewPage;
  let fixture: ComponentFixture<CalendarNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
