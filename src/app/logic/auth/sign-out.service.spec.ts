import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignOutService } from './sign-out.service';

describe('SignOutService', () => {
  let service: SignOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SignOutService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
