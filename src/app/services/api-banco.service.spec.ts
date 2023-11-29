import { TestBed } from '@angular/core/testing';

import { ApiBancoService } from './api-banco.service';

describe('ApiBancoService', () => {
  let service: ApiBancoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBancoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
