import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarHomePage } from './calendar-home.page';

describe('CalendarHomePage', () => {
  let component: CalendarHomePage;
  let fixture: ComponentFixture<CalendarHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
