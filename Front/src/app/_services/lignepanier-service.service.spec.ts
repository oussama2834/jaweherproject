import { TestBed } from '@angular/core/testing';

import { LignepanierServiceService } from './lignepanier-service.service';

describe('LignepanierServiceService', () => {
  let service: LignepanierServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignepanierServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
