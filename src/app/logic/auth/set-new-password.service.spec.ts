import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SetNewPasswordService } from './set-new-password.service';

describe('SetNewPasswordService', () => {
  let service: SetNewPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SetNewPasswordService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SetNewPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
