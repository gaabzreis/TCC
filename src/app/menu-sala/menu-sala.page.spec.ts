import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSalaPage } from './menu-sala.page';

describe('MenuSalaPage', () => {
  let component: MenuSalaPage;
  let fixture: ComponentFixture<MenuSalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
