import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccountService } from 'src/app/core/account-service/account.service';
import { LoggingService } from 'src/app/core/logging/loggin.service';
import { MockedAccountService } from 'src/testing/mocked-account-service';
import { MockedLoggingService } from 'src/testing/mocked-logging-service';

import { SignUpConfirmService } from './sign-up-confirm.service';

describe('SignUpConfirmService', () => {
  let service: SignUpConfirmService;

  let valueServiceSpy: jasmine.SpyObj<AccountService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', ['signUpConfirm']);
    TestBed.configureTestingModule({
      providers: [
        SignUpConfirmService,
        { provide: AccountService, useValue: spy },
        { provide: LoggingService, useClass: MockedLoggingService },
      ],
    });
    service = TestBed.inject(SignUpConfirmService);
    valueServiceSpy = TestBed.inject(
      AccountService
    ) as jasmine.SpyObj<AccountService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('"result$" should emit a Result<string> value when signUpConfirm emit a correct value', () => {
    valueServiceSpy.signUpConfirm.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.result$.subscribe((data) => {
      expect(data).toEqual({
        result: 'success',
      });
    });
    service.signUpConfirmationCode({ code: '', username: '' });
  });

  it('"success$" should emit a <string> value when signUpConfirm emit a correct value', () => {
    valueServiceSpy.signUpConfirm.and.returnValue(
      of({
        result: 'success',
      })
    );

    service.success$.subscribe((data) => {
      expect(data).toEqual('success');
    });
    service.signUpConfirmationCode({ code: '', username: '' });
  });

  it('"error$" should emit "string" value when signUpConfirm emit a error value', () => {
    valueServiceSpy.signUpConfirm.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.error$.subscribe((data) => {
      expect(data).toEqual('some error');
    });
    service.signUpConfirmationCode({ code: '', username: '' });
  });

  it('"loading$" should emit a "boolean" value when signUpConfirm emit any value', () => {
    valueServiceSpy.signUpConfirm.and.returnValue(
      of({
        error: 'some error',
      })
    );

    service.loading$.subscribe((data) => {
      data ? expect(data).toEqual(true) : expect(data).toEqual(false);
    });

    service.signUpConfirmationCode({ code: '', username: '' });
  });
});
