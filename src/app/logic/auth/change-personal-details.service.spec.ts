import { TestBed } from '@angular/core/testing';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ChangePersonalDetailsService } from './change-personal-details.service';

describe('ChangePersonalDetailsService', () => {
  let service: ChangePersonalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChangePersonalDetailsService,
        { provide: AccountService, useClass: MockedAccountService },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ChangePersonalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
