import { TestBed } from '@angular/core/testing';

import { CadastrarUserService } from './cadastrar-user.service';

describe('CadastrarUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastrarUserService = TestBed.get(CadastrarUserService);
    expect(service).toBeTruthy();
  });
});
