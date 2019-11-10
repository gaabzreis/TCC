import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTotalPage } from './ranking-total.page';

describe('RankingTotalPage', () => {
  let component: RankingTotalPage;
  let fixture: ComponentFixture<RankingTotalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingTotalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingTotalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
