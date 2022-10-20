import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { CheckTokenFpService } from './check-token-fp.service';

describe('CheckTokenFpService', () => {
  let service: CheckTokenFpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CheckTokenFpService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(CheckTokenFpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
