import { TestBed } from '@angular/core/testing';

import { ResumoService } from './resumo.service';

describe('ResumoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumoService = TestBed.get(ResumoService);
    expect(service).toBeTruthy();
  });
});
