import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaHomePage } from './sala-home.page';

describe('SalaHomePage', () => {
  let component: SalaHomePage;
  let fixture: ComponentFixture<SalaHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
