import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ChangeEmailService } from './change-email.service';

describe('ChangeEmailService', () => {
  let service: ChangeEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangeEmailService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangeEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
