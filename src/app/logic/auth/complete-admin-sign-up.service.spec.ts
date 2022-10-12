import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { CompleteAdminSignUpService } from './complete-admin-sign-up.service';

describe('CompleteNewPasswordService', () => {
  let service: CompleteAdminSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompleteAdminSignUpService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CompleteAdminSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
