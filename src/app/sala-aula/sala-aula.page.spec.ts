import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaAulaPage } from './sala-aula.page';

describe('SalaAulaPage', () => {
  let component: SalaAulaPage;
  let fixture: ComponentFixture<SalaAulaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaAulaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaAulaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
