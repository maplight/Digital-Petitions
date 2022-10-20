import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ConfirmChangeEmailService } from './confirm-change-email.service';

describe('ConfirmChangeEmailService', () => {
  let service: ConfirmChangeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfirmChangeEmailService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ConfirmChangeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
