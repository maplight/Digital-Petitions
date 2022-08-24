import { TestBed } from '@angular/core/testing';

import { GetSignaturesService } from './get-signatures.service';

describe('GetSignaturesService', () => {
  let service: GetSignaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSignaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
