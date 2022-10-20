import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { ConfirmChangeEmailService } from './confirm-change-email.service';

describe('ConfirmChangeEmailService', () => {
  let service: ConfirmChangeEmailService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['confirmEmailChange']);
    TestBed.configureTestingModule({
      providers: [
        ConfirmChangeEmailService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(ConfirmChangeEmailService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('"result$" should emit a Result<string> value when confirmEmailChange emit a correct value', () => {
    valueServiceSpy.confirmEmailChange.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.setConfirmationCode({ code: '' });
  });

  it('"success$" should emit a <string> value when confirmEmailChange emit a correct value', () => {
    valueServiceSpy.confirmEmailChange.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.setConfirmationCode({ code: '' });
  });

  it('"error$" should emit "string" value when confirmEmailChange emit a error value', () => {
    valueServiceSpy.confirmEmailChange.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.setConfirmationCode({ code: '' });
  });

  it('"loading$" should emit a "boolean" value when confirmEmailChange emit any value', () => {
    valueServiceSpy.confirmEmailChange.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.setConfirmationCode({ code: '' });
  });
});
