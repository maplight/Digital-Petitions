import { TestBed } from '@angular/core/testing';

import { SignUpResendCodeService } from './sign-up-resend-code.service';

describe('SignUpResendCodeService', () => {
  let service: SignUpResendCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignUpResendCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
