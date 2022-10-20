import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignUpConfirmService } from './sign-up-confirm.service';

describe('SignUpConfirmService', () => {
  let service: SignUpConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignUpConfirmService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignUpConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
