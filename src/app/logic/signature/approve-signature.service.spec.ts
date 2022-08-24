import { TestBed } from '@angular/core/testing';

import { ApproveSignatureService } from './approve-signature.service';

describe('ApproveSignatureService', () => {
  let service: ApproveSignatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveSignatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
