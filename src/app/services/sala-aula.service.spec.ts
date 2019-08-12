import { TestBed } from '@angular/core/testing';

import { SalaAulaService } from './sala-aula.service';

describe('SalaAulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaAulaService = TestBed.get(SalaAulaService);
    expect(service).toBeTruthy();
  });
});
