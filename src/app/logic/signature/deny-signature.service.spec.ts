import { TestBed } from '@angular/core/testing';

import { DenySignatureService } from './deny-signature.service';

describe('DenySignatureService', () => {
  let service: DenySignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenySignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
