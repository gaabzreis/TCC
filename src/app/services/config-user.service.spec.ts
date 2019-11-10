import { TestBed } from '@angular/core/testing';

import { ConfigUserService } from './config-user.service';

describe('ConfigUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfigUserService = TestBed.get(ConfigUserService);
    expect(service).toBeTruthy();
  });
});
