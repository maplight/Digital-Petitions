import { TestBed } from '@angular/core/testing';

import { CompleteAdminSignUpService } from './complete-admin-sign-up.service';

describe('CompleteNewPasswordService', () => {
  let service: CompleteAdminSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteAdminSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
