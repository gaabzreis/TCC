import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarNotificacaoPage } from './configurar-notificacao.page';

describe('ConfigurarNotificacaoPage', () => {
  let component: ConfigurarNotificacaoPage;
  let fixture: ComponentFixture<ConfigurarNotificacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurarNotificacaoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarNotificacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
