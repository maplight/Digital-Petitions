import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignUpResendCodeService } from './sign-up-resend-code.service';

describe('SignUpResendCodeService', () => {
  let service: SignUpResendCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignUpResendCodeService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignUpResendCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
